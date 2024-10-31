import { useEffect, useRef, useState } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import ActionBtn from "../utils/Buttons";
import { getBrowser } from "../utils/getBrowserDetail";
import uploadFile from "../utils/uploadAudio";
import AudioPlayer from "../AudioPlayer";
let stopRecordingTimeout: any;
import { useLoaderData, useFetcher } from "@remix-run/react";
import contributeAudio from "./utils/contributeSpeak";
import deleteContribution from "./utils/deleteContribution";

export default function SpeakComponent() {
  const loaderData = useLoaderData();
  const speak_contributions = loaderData?.user?.[0] || [];
  const totalContribution = speak_contributions.length
  let mediaRecorder: any = useRef();
  const [tempAudioURL, setTempAudioURL] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioBlob, setaudioBlob] = useState(null);
  const [count, setcount] = useState(
    () =>
      speak_contributions
        .map((item) => item.url)
        .filter((item) => item !== "").length
  );

  useEffect(()=> {
    setcount(0)
  }, [])

  const getMicrophonePermission = async () => {
    let permissionStatus = await navigator?.permissions.query({
      name: "microphone",
    });
    if (permissionStatus.state === "prompt") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          // Use the audio stream
        })
        .catch((error) => {
          // Handle the error or guide the user to enable permissions
        });
      alert("Please provide the required permission from browser settings");
    } else if (permissionStatus.state === "denied") {
      // The user has denied permission - guide them to enable it manually
      alert("Please enable microphone permissions in your browser settings.");
    } else if (permissionStatus.state === "granted") {
      // Permission was already granted
      return await navigator?.mediaDevices.getUserMedia({ audio: true });
    }
  };
  const startRecording = async () => {
    let stream = await getMicrophonePermission();
    if (stream) {
      try {
        let localAudioChunks: [] = [];
        setRecording(true);
        setTempAudioURL(null);
        let browserName = getBrowser();
        const media = new MediaRecorder(stream, {
          mimeType: browserName !== "Safari" ? "audio/webm" : "audio/mp4",
        });
        mediaRecorder.current = media;
        mediaRecorder.current.start();

        mediaRecorder.current.ondataavailable = (event: any) => {
          if (typeof event.data === "undefined") return;
          if (event.data.size === 0) return;
          localAudioChunks.push(event?.data);
        };

        setAudioChunks(localAudioChunks);
        stopRecordingTimeout = setTimeout(() => {
          stopRecording();
        }, 120000);
      } catch (error) {
        console.error("Error accessing the microphone:", error);
      }
    }
  };
  const stopRecording = () => {
    if (stopRecordingTimeout) {
      clearTimeout(stopRecordingTimeout);
    }

    setRecording(false);
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks);
      setaudioBlob(audioBlob);
      setTempAudioURL(URL.createObjectURL(audioBlob));
      console.log(URL.createObjectURL(audioBlob));
      setAudioChunks([]);
    };
  };
  const reRecord = () => {
    setRecording(false);
    setTempAudioURL(null);
  };
  const resetRecord = () => {
    setcount((p)=>p+1);
    setRecording(false);
    setaudioBlob(null);
    setAudioChunks([]);
    setTempAudioURL(null);
  };

  const handleSkip = async () => {
    const contribution_id = speak_contributions[count].id;
    const res = await deleteContribution(contribution_id)
    if (res.status === 'success')
      resetRecord()
  }
  const submitAudio = async () => {
    if (audioBlob) {
      const res = await uploadFile(audioBlob);
      if (res.status === "success") {
        console.log("Audio URL:", res.audio_url);
        const contribution_id = speak_contributions[count].id;
        const audio_url = res.audio_url ||""
        const status = await contributeAudio( contribution_id, audio_url );
        resetRecord();
      }
    }
  };
  const sampleText = speak_contributions.map((item) => item.source_text);
  
  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      {count < totalContribution ? (
        <>
          <div className="flex flex-col items-center justify-around w-4/5 h-48 space-y-4 p-4 bg-primary-100 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-full">
              <div className="flex-1 text-2xl text-center">
                {sampleText[count]}
              </div>
              {!recording && (
                <button
                  disabled={count === 5}
                  className="text-primary-900 text-sm font-medium underline cursor-pointer mr-6"
                  onClick={handleSkip}
                >
                  Skip
                </button>
              )}
            </div>

            <div className="">
              {recording && (
                <CiMicrophoneOn size={20} onClick={stopRecording} />
              )}
              {tempAudioURL && <AudioPlayer tempAudioURL={tempAudioURL} />}
            </div>
            <div className="flex items-center justify-center space-x-2">
              {!recording && !tempAudioURL ? (
                <ActionBtn
                  text="Start Recording"
                  isDisabled={count === 5}
                  style="bg-primary-700 text-xs font-medium text-white"
                  handleClick={startRecording}
                />
              ) : (
                <ActionBtn
                  text={tempAudioURL ? "Re-Record" : "Stop Recording"}
                  isDisabled={count === 5}
                  style="bg-primary-700 text-xs font-medium text-white"
                  handleClick={recording ? stopRecording : reRecord}
                />
              )}
              <ActionBtn
                text="Submit"
                isDisabled={!tempAudioURL || count === 5}
                style="bg-primary-50 text-xs text-primary-900 font-medium border border-neutral-900"
                handleClick={submitAudio}
              />
            </div>
          </div>
          {!recording && (
            <div className="flex items-center justify-center w-3/5 space-x-2">
              <div className="w-full bg-white rounded-full h-2.5">
                <div
                  className="bg-primary-900 h-2.5 rounded-full"
                  style={{ width: `${((count + 1) / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium">
                {count + 1}/{totalContribution}
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-around w-4/5 h-48 bg-primary-100 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 text-sm font-medium text-center">
              {totalContribution === 0
                ? "You don't have enough data to contribution!"
                : `You have contributed to ${totalContribution} recording for your
              language !`}
              <div>{totalContribution === 0 && "Kindly wait!!"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
