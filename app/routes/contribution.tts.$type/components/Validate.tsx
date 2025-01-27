import { useRef, useState } from "react";
import { CiHeadphones } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoRepeat } from "react-icons/io5";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Correctbtn, Incorrectbtn, Skipbtn } from "~/components/Buttons";
import ValidateMore from "~/components/ValidateMore";
import CurrentStatus from "~/components/CurrentStatus";
import Progressbar from "~/components/Progressbar";

interface SpeakValidation {
  validation_id: string;
  contribution_text: string;
  source_audio_url: string;
}

interface LoaderData {
  data: SpeakValidation [];
  currentUser: any;
}

export default function ValidateListen() {
  // Hooks
  const { data: speak_validations = [], currentUser:user } =
    useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  const audioRef = useRef<HTMLAudioElement>(null);

  // State
  const [isListening, setIsListening] = useState(false);
  const [listened, setListened] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Derived values
  const totalValidation = speak_validations.length;
  const currentValidation = speak_validations[0];
  const isCompleted = totalValidation === 0;

  // Handlers
  const handlePlay = () => {
    setIsListening(true);
    setListened(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleReplay = () => {
    setListened(false);
    setIsListening(false);
  };

  const handleAudioSpeed = () => {
    const speeds = [0.5, 1, 1.5];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];

    // Update the playback speed
    setPlaybackSpeed(newSpeed);
    audioRef.current.playbackRate = newSpeed;
  };

  const handleSkip = () => {
    if (!currentValidation) return;

    const formData = new FormData();
    formData.append("type", "tts");
    formData.append("validation_id", currentValidation.validation_id);
    fetcher.submit(formData, {
      method: "DELETE",
      action: "/api/delete-validation",
    });

    setIsListening(false);
    setListened(false);
  };

  const handleSubmit = (is_valid: boolean) => {
    if (!currentValidation) return;

    const formData = new FormData();
    formData.append("type", "tts");
    formData.append("validation_id", currentValidation.validation_id);
    formData.append("is_valid", String(is_valid));

    fetcher.submit(formData, { method: "PUT", action: "/api/validate" });

    setIsListening(false);
    setListened(false);
  };

  const handleLoadMore = () => {
    const formData = new FormData();
    formData.append("type", "tts");
    formData.append("user_id", user?.user_id);

    fetcher.submit(formData, {
      method: "POST",
      action: "/api/assign-contribution",
    });
  };

  if (isCompleted) {
    return <ValidateMore handleLoadMore={handleLoadMore} />;
  }

  return (
    <>
      <div className="grid grid-cols-6 grid-rows-6 w-full py-4 h-full">
        <div className=" row-span-4 hidden md:block" />
        <div className="col-span-6 md:col-span-4 row-span-5 shadow-md bg-white rounded-lg overflow-hidden mx-4 md:m-0">
          <div className="flex flex-col justify-around items-center h-full py-5 relative space-y-5">
            <Progressbar totalNumbers={totalValidation} />
            <div className="flex-1 flex flex-col space-y-10 text-md font-medium text-center text-primary-900">
              <div className="text-lg font-semibold font-monlam">
                {" "}
                ཚིག་རིས་ཇི་བཞིན་ཀློགས།
              </div>

              <div className="text-neutral-950 font-monlam font-medium text-lg w-full p-5 leading-loose">
                {currentValidation?.source_text}
              </div>
            </div>

            <div className="flex-1">
              <audio
                src={currentValidation?.contribution_url}
                onEnded={() => setIsListening(false)}
                className="hidden"
                ref={audioRef}
              />
              {!isListening && !listened && (
                <div
                  className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary-50 cursor-pointer"
                  onClick={handlePlay}
                >
                  <FaPlay size={25} />
                </div>
              )}
              {isListening && (
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-300 cursor-pointer text-md font-medium" onClick={handleAudioSpeed}>
                  <span className="text-sm">x</span>
                  {playbackSpeed}
                </div>
              )}
              {!isListening && listened && (
                <div
                  className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-300 cursor-pointer"
                  onClick={handleReplay}
                >
                  <IoRepeat size={25} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row-span-5 place-content-center hidden md:block">
          <CurrentStatus totalNumbers={totalValidation} />
        </div>
        <div className="col-span-full">
          <div className="flex flex-row items-center justify-center h-full space-x-2 md:space-x-6">
            <Skipbtn handleClick={handleSkip} />
            <Incorrectbtn handleClick={() => handleSubmit(false)} />
            <Correctbtn handleClick={() => handleSubmit(true)} />
          </div>
        </div>
      </div>
    </>
  );
}
