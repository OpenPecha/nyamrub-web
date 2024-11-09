import { useRef, useState, useCallback } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { Spinner } from "flowbite-react";
import { useLoaderData, useFetcher } from "@remix-run/react";
import AudioPlayer from "../../../components/AudioPlayer";
import ActionBtn from "../../../components/Buttons";
import { getBrowser } from "../../../utils/getBrowserDetail";
import uploadAudio from "~/utils/uploadAudio";
import ProgressBar from "~/components/ProgressBar";
import ContributeMore from "~/components/ContributeMore";

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
const RECORDING_TIMEOUT = 120000; // 2 minutes in milliseconds
const MIME_TYPES = {
  Safari: "audio/mp4",
  default: "audio/webm",
} as const;

export default function SpeakComponent() {
  // Hooks
  const { data: speak_contributions = [], user_id } =
    useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const recordingTimeoutRef = useRef<NodeJS.Timeout>();

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
  }, [fetcher, speak_contributions]);

  const handleSubmit = useCallback(async () => {
    if (!recordingState.audioBlob) return;

    setRecordingState((prev) => ({ ...prev, isUploading: true }));

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
      setRecordingState((prev) => ({ ...prev, isUploading: false }));
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
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      <div className="flex flex-col items-center justify-around w-4/5 h-48 space-y-4 p-4 bg-primary-100 rounded-lg shadow-md">
        <div className="flex items-center justify-center w-full">
          <div className="flex-1 text-2xl text-center">{currentText}</div>
          {!recordingState.isRecording && (
            <button
              className="text-primary-900 text-sm font-medium underline cursor-pointer mr-6"
              onClick={handleSkip}
            >
              མཆོང་།
            </button>
          )}
        </div>

        <div>
          {recordingState.isRecording && (
            <CiMicrophoneOn size={20} onClick={stopRecording} />
          )}
          {recordingState.tempAudioURL && !recordingState.isUploading && (
          <AudioPlayer tempAudioURL={recordingState.tempAudioURL} />
          )}
          {recordingState.isUploading && (
            <div className="text-primary-500">
              <Spinner size="md" className="fill-primary-800" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-center space-x-2">
          <ActionBtn
            text={
              !recordingState.isRecording && !recordingState.tempAudioURL
                ? "Start Recording"
                : recordingState.tempAudioURL
                ? "Re-Record"
                : "Stop Recording"
            }
            style="bg-primary-700 text-xs font-medium text-white"
            handleClick={
              !recordingState.isRecording && !recordingState.tempAudioURL
                ? startRecording
                : recordingState.isRecording
                ? stopRecording
                : () => {
                    setRecordingState({
                      tempAudioURL: null,
                      isRecording: false,
                      audioChunks: [],
                      audioBlob: null,
                      isUploading: false,
                    });
                  }
            }
          />
          <ActionBtn
            text="Submit"
            isDisabled={!canSubmit}
            style="bg-primary-50 text-xs text-primary-900 font-medium border border-neutral-900"
            handleClick={handleSubmit}
          />
        </div>
      </div>

      {!recordingState.isRecording && (
        <ProgressBar total={totalContribution} />
      )}
    </div>
  );
}
