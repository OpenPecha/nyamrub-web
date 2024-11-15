import { useRef, useState } from "react";
import { CiHeadphones } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoRepeat } from "react-icons/io5";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn from "~/components/Buttons";
import ProgressBar from "~/components/ProgressBar";
import ValidateMore from "~/components/ValidateMore";
import CurrentStatus from "~/components/CurrentStatus";

interface SpeakValidation {
  validation_id: string;
  contribution_text: string;
  source_audio_url: string;
}

interface LoaderData {
  data: SpeakValidation [];
  user_id: string;
}

export default function ValidateListen() {
  // Hooks
  const { data: speak_validations = [], user_id } =
    useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  const audioRef = useRef<HTMLAudioElement>(null);

  // State
  const [isListening, setIsListening] = useState(false);
  const [listened, setListened] = useState(false);

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
    formData.append("type", "stt");
    formData.append("user_id", user_id);

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
        <div className=" row-span-4"/>
        <div className="col-span-4 row-span-4 shadow-md bg-white rounded-3xl overflow-hidden">
          <div className="flex flex-col justify-around items-center h-full py-5">
            <div className="flex-1 flex flex-col space-y-10 text-md font-medium text-center text-primary-900">
              <div> ཚིག་རིས་ཇི་བཞིན་ཀློགས།</div>

              <div>{currentValidation?.source_text}</div>
            </div>

            <div className="flex-1">
              <audio
                // src={currentValidation?.source_audio_url}
                src="https://monlam-test.s3.ap-south-1.amazonaws.com/BashaDan/speak/1731652678396-recording.mp3"
                onEnded={() => setIsListening(false)}
                className="hidden"
                ref={audioRef}
              />
              {!isListening && !listened && (
                <div
                  className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-300 cursor-pointer"
                  onClick={handlePlay}
                >
                  <FaPlay size={25} />
                </div>
              )}
              {isListening && (
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-300 cursor-pointer">
                  <CiHeadphones size={25} />
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
        <div className="row-span-4">
          <CurrentStatus totalNumbers={totalValidation} />
        </div>
        <div className="col-span-full">
          <div className="flex items-center justify-center h-full space-x-2">
            <ActionBtn
              text="མཆོང་།"
              isDisabled={isListening || !listened}
              style="bg-primary-700 text-xs font-medium text-white"
              handleClick={() => handleSubmit(false)}
            />
            <ActionBtn
              text="འགྲིག"
              isDisabled={isListening || !listened}
              style="bg-primary-700 text-xs font-medium text-white"
              handleClick={() => handleSubmit(true)}
            />
          </div>
        </div>
        <div className="col-span-full">
          <div className="flex items-start justify-end h-full">
            <ActionBtn
              text="Skip"
              style="justify-self-end bg-primary-700 text-xs font-medium text-white mr-10"
              handleClick={handleSkip}
            />
          </div>
        </div>
      </div>
    </>
  );
}
