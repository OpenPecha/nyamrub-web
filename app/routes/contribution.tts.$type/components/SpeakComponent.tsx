import { useRef, useState, useCallback } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { Spinner } from "flowbite-react";
import { useLoaderData, useFetcher } from "@remix-run/react";
import AudioPlayer from "../../../components/AudioPlayer";
import ActionBtn, { Correctbtn, Skipbtn } from "../../../components/Buttons";
import { getBrowser } from "../../../utils/getBrowserDetail";
import uploadAudio from "~/utils/uploadAudio";
import { FaMicrophone } from "react-icons/fa";
import { CiStop1 } from "react-icons/ci";
import { BsArrowRepeat } from "react-icons/bs";
import ContributeMore from "~/components/ContributeMore";
import AudioVisualizer from "~/components/AudioVisualizer";
import CurrentStatus from "~/components/CurrentStatus";
import LoadingSpinner from "~/components/LoadingSpinner";
import Progressbar from "~/components/Progressbar";
// Types
interface SpeakContribution {
  id: string;
  source_text: string;
  url: string;
}

interface LoaderData {
  data: SpeakContribution[];
  user_id: string;
}

// Constants
const RECORDING_TIMEOUT = 60000; // 2 minutes in milliseconds
const MIME_TYPES = {
  Safari: "audio/mp4",
  default: "audio/webm",
} as const;

export default function SpeakComponent() {
  // Hooks
  const { data: speak_contributions = [], user_id } =
    useLoaderData<LoaderData>();
  console.log("speak_contributions", speak_contributions);
  const fetcher = useFetcher();
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const recordingTimeoutRef = useRef<NodeJS.Timeout>();
  const mediaStreamRef = useRef<MediaStream | null>(null);
  // State
  const [recordingState, setRecordingState] = useState({
    tempAudioURL: null as string | null,
    isRecording: false,
    audioChunks: [] as Blob[],
    audioBlob: null as Blob | null,
    isUploading: false,
  });

  // Derived values
  const totalContribution = speak_contributions.length;
  const currentText = speak_contributions[0]?.source_text;
  const isCompleted = totalContribution === 0;
  const canSubmit =
    !recordingState.isRecording &&
    recordingState.tempAudioURL &&
    0 < totalContribution;

  // Handlers
  const getMicrophonePermission = useCallback(async () => {
    try {
      const permissionStatus = await navigator?.permissions.query({
        name: "microphone" as PermissionName,
      });

      switch (permissionStatus.state) {
        case "prompt":
          await navigator.mediaDevices.getUserMedia({ audio: true });
          alert("Please provide the required permission from browser settings");
          break;
        case "denied":
          alert(
            "Please enable microphone permissions in your browser settings."
          );
          break;
        case "granted":
          return await navigator.mediaDevices.getUserMedia({ audio: true });
      }
    } catch (error) {
      console.error("Microphone permission error:", error);
    }
  }, []);

  const startRecording = useCallback(async () => {
    const stream = await getMicrophonePermission();
    if (!stream) return;

    try {
      mediaStreamRef.current = stream;
      const chunks: Blob[] = [];
      const browserName = getBrowser();
      const mimeType =
        browserName === "Safari" ? MIME_TYPES.Safari : MIME_TYPES.default;

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorder.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data?.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.start();
      setRecordingState((prev) => ({
        ...prev,
        isRecording: true,
        audioChunks: chunks,
        tempAudioURL: null,
      }));

      recordingTimeoutRef.current = setTimeout(
        () => stopRecording(),
        RECORDING_TIMEOUT
      );
    } catch (error) {
      console.error("Recording error:", error);
    }
  }, [getMicrophonePermission]);

  const stopRecording = useCallback(() => {
    if (!mediaRecorder.current) return;

    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current);
    }

    mediaRecorder.current.stop();
    setRecordingState((prev) => ({ ...prev, isRecording: false }));

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(recordingState.audioChunks);
      const audioUrl = URL.createObjectURL(audioBlob);

      setRecordingState((prev) => ({
        ...prev,
        audioBlob,
        tempAudioURL: audioUrl,
        audioChunks: [],
      }));
    };
  }, [recordingState.audioChunks]);

  const handleSkip = useCallback(() => {
    const contribution_id = speak_contributions[0]?.id;
    if (!contribution_id) return;
    const formData = new FormData();
    formData.append("type", "tts");
    formData.append("contribution_id", contribution_id);
    fetcher.submit(
      formData,
      { method: "delete", action: "/api/delete-contribution" }
    );
    setRecordingState({
      tempAudioURL: null,
      isRecording: false,
      audioChunks: [],
      audioBlob: null,
      isUploading: false,
    });
  }, [fetcher, speak_contributions]);

  const handleSubmit = useCallback(async () => {
    if (!recordingState.audioBlob) return;
      setRecordingState((prev) => ({ ...prev, isRecording: false, isUploading: true }));

    try {
      const res = await uploadAudio(recordingState.audioBlob);

      if (res.status === "success") {
        const formData = new FormData();
        formData.append("type", "tts");
        formData.append("contribution_id", speak_contributions[0].id);
        formData.append("contribution_data", res?.audio_url);

        fetcher.submit(formData, {
          method: "post",
          action: "/api/contribute",
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setRecordingState((prev) => ({ ...prev,
      tempAudioURL: null,
      audioChunks: [],
      audioBlob: null,
      isUploading: false, }));
    }
  }, [fetcher, recordingState.audioBlob, speak_contributions]);

  const handleLoadMore = useCallback(() => {
    const formData = new FormData();
    formData.append("type", "tts");
    formData.append("user_id", user_id);
    fetcher.submit(
      formData,
      { method: "post", action: "/api/assign-data" }
    );
  }, [fetcher, user_id]);

  if (isCompleted) {
    return (
      <ContributeMore handleLoadMore={handleLoadMore} />
    );
  }

  return (
    <div className="grid grid-cols-6 grid-rows-6 w-full py-4 h-full">
      <div className="row-span-4 hidden md:block" />
      <div className="col-span-6 md:col-span-4 row-span-5 md:row-span-4 shadow-md bg-white rounded-lg overflow-hidden mx-4 md:m-0">
        <div className="flex flex-col justify-around items-center h-full py-5 relative space-y-5">
          <Progressbar totalNumbers={totalContribution} />
          <div className="flex-1 flex flex-col space-y-10 text-md font-medium text-center text-primary-900">
            <div className="text-lg font-semibold font-monlam">
              {" "}
              ཚིག་རིས་ཇི་བཞིན་ཀློགས།
            </div>

            <div className="text-neutral-950 font-monlam text-lg leading-loose p-5">
              {currentText}
            </div>
          </div>
          <div className="flex-1">
            {!recordingState.isRecording && !recordingState.tempAudioURL && (
              <div
                className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary-50 cursor-pointer"
                onClick={startRecording}
              >
                <FaMicrophone size={30} className="text-neutral-950" />
              </div>
            )}
            {recordingState.isRecording && !recordingState.tempAudioURL && (
              <div
                className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary-50 cursor-pointer mx-auto"
                onClick={stopRecording}
              >
                <CiStop1 size={30} className="text-primary-900" />
              </div>
            )}

            {recordingState.tempAudioURL && !recordingState.isUploading && (
              <AudioPlayer tempAudioURL={recordingState.tempAudioURL} />
            )}
            {!recordingState.isRecording &&
              recordingState.tempAudioURL &&
              !recordingState.isUploading && (
                <div className="flex items-center justify-center py-5 w-full">
                  <BsArrowRepeat
                    size={30}
                    className="text-secondary-500 cursor-pointer"
                    onClick={() => {
                      setRecordingState({
                        tempAudioURL: null,
                        isRecording: false,
                        audioChunks: [],
                        audioBlob: null,
                        isUploading: false,
                      });
                    }}
                  />
                </div>
              )}
            {recordingState.isRecording && (
              <div className="md:hidden">
              <AudioVisualizer
                mediaStream={mediaStreamRef.current}
                isRecording={recordingState.isRecording}
                height="50px"
                barColor="#6E5C2B"
                />
                </div>
            )}
            {recordingState.isUploading && <LoadingSpinner />}
          </div>
        </div>
      </div>
      <div className="row-span-4 place-content-center hidden md:block">
        <CurrentStatus totalNumbers={totalContribution} />
      </div>
      <div className="col-span-full">
        <div className="flex items-center justify-center space-x-2 h-full">
          <div className="md:hidden">
            <Skipbtn handleClick={handleSkip} />
          </div>
          {recordingState.tempAudioURL && !recordingState.isUploading && (
            <Correctbtn handleClick={handleSubmit} />
          )}

          {recordingState.isRecording && (
            <div className="hidden md:flex">
            <AudioVisualizer
              mediaStream={mediaStreamRef.current}
              isRecording={recordingState.isRecording}
              height="50px"
              barColor="#6E5C2B"
              />
              </div>
          )}
        </div>
      </div>
      <div className="col-span-full hidden md:block">
        <div className="flex items-start justify-end h-full">
          <Skipbtn handleClick={handleSkip} />
        </div>
      </div>
    </div>
  );
}
