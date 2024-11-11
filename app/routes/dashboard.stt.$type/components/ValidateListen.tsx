import { useRef, useState } from "react";
import { CiHeadphones } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoRepeat } from "react-icons/io5";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn from "~/components/Buttons";
import ProgressBar from "~/components/ProgressBar";
import ValidateMore from "~/components/ValidateMore";

interface ListenValidation {
  validation_id: string;
  contribution_text: string;
  source_audio_url: string;
}

interface LoaderData {
  data: ListenValidation[];
  user_id: string;
}

export default function ValidateListen() {
  // Hooks
  const { data: listen_validations = [], user_id } =
    useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  const audioRef = useRef<HTMLAudioElement>(null);

  // State
  const [isListening, setIsListening] = useState(false);
  const [listened, setListened] = useState(false);

  // Derived values
  const totalValidation = listen_validations.length;
  const currentValidation = listen_validations[0];
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
    formData.append("type", "stt");
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
    formData.append("type", "stt");
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
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      <div className="flex flex-col items-center justify-around w-4/5 h-48 space-y-4 bg-primary-100 rounded-lg shadow-md">
        <div className="flex items-center justify-center w-full text-2xl text-center">
          <span className="flex-1">{currentValidation?.contribution_text}</span>
          <button
            disabled={isListening || !listened}
            className={`text-primary-900 text-sm font-medium underline ${
              isListening || !listened ? "cursor-not-allowed" : "cursor-pointer"
            } mr-6`}
            onClick={handleSkip}
          >
            མཆོང་།
          </button>
        </div>

        <div>
          <audio
            src={currentValidation?.source_audio_url}
            onEnded={() => setIsListening(false)}
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

      <ProgressBar total={totalValidation} />
    </div>
  );
}
