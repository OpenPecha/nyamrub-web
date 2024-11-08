import { useRef, useState } from "react";
import { CiHeadphones } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoRepeat } from "react-icons/io5";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn from "../../../components/Buttons";
import ProgressBar from "~/components/ProgressBar";
import ValidateMore from "~/components/ValidateMore";
interface SpeakValidation {
  id: string;
  source_text: string;
  contribution_url: string;
}
interface LoaderData {
  data: SpeakValidation[];
  user_id: string;
}

export default function ValidateAudio() {
  // Hooks
  const { data: speak_validations = [], user_id } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  const audioRef = useRef(null);

  // State
  const [isListening, setisListening] = useState(false);
  const [listened, setlistened] = useState(false);

  // Derived values
  const totalValidation = speak_validations.length;
  const currentText = speak_validations[0]?.source_text;
  const contributedAudioUrl = speak_validations[0]?.contribution_url;
  const isCompleted = totalValidation === 0;

  // handlers
  const handlePlay = () => {
    setisListening(true);
    setlistened(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  const handleReplay = () => {
    setlistened(false);
    setisListening(false);
  };
  const handleSkip = async () => {
    const validation_id = speak_validations[0].validation_id;
    fetcher.submit(
      { validation_id },
      { method: "DELETE", action: "/api/tts/validate" }
    );
  };

  const handleSubmit = async (is_valid: boolean) => {
    const validation_id = speak_validations[0].validation_id;
    const formData = new FormData();
    formData.append("validation_id", validation_id);
    formData.append("is_valid", is_valid);
    fetcher.submit(formData, { method: "PUT", action: "/api/tts/validate" });
    setisListening(false);
    setlistened(false);
  };

  const handleLoadMore = async () => {
    fetcher.submit(
      { user_id },
      { method : "POST", action: "/api/tts/assign-contribution" }
    );
  };

  if (isCompleted) {
    return <ValidateMore handleLoadMore={handleLoadMore} />;
  }

  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      <div className="flex flex-col items-center justify-around w-4/5 h-48 space-y-4 bg-primary-100 rounded-lg shadow-md">
        <div className="flex items-center justify-center w-full text-2xl text-center">
          <span className="flex-1">{currentText}</span>
          <button
            disabled={isListening || !listened}
            className={`text-primary-900 text-sm font-medium underline ${
              isListening || !listened ? "cursor-not-allowed": "cursor-pointer"
            } mr-6 `}
            onClick={handleSkip}
          >
            {/* Skip */}
            མཆོང་།
          </button>
        </div>

        <div className="">
          <audio
            // src={
            //   "https://d38pmlk0v88drf.cloudfront.net/wav16k/STT_AM0001_0002_99711_to_106731.wav"
            // }
            src={contributedAudioUrl}
            onEnded={() => setisListening(false)}
            className="hidden"
            ref={audioRef}
          />
          {!isListening && !listened && (
            <div
              className="bg-white p-4 rounded-full text-center cursor-pointer"
              onClick={handlePlay}
            >
              <FaPlay size={15} />
            </div>
          )}
          {isListening && (
            <div className="bg-white p-4 rounded-full text-center">
              <CiHeadphones size={15} />
            </div>
          )}
          {!isListening && listened && (
            <div
              className="bg-white p-4 rounded-full text-center cursor-pointer"
              onClick={handleReplay}
            >
              <IoRepeat size={15} />
            </div>
          )}
        </div>
        <div className="flex items-center justify-center space-x-2">
          <ActionBtn
            // text="X incorrect"
            text="མཆོང་།"
            isDisabled={isListening || !listened}
            style="bg-primary-700 text-xs font-medium text-white"
            handleClick={() => handleSubmit(false)}
          />
          <ActionBtn
            // text="Y correct"
            text="འགྲིག"
            isDisabled={isListening || !listened}
            style="bg-primary-700 text-xs font-medium text-white"
            handleClick={() => handleSubmit(true)}
          />
        </div>
      </div>

      <ProgressBar total={totalValidation} />
    </div>
  );
}
