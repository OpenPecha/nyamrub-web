import { useRef, useState } from "react";
import { CiHeadphones } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoRepeat } from "react-icons/io5";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn from "~/components/Buttons";
import ProgressBar from "~/components/ProgressBar";
import ValidateMore from "~/components/ValidateMore";
import AudioPlayer from "~/components/AudioPlayer";
import CurrentStatus from "~/components/CurrentStatus";

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
  console.log(listen_validations);
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
    <div className="grid grid-cols-6 grid-rows-6 py-4 w-full h-full">
      <div className="row-span-4" />
      <div className="col-span-4 row-span-4 bg-white shadow-md rounded-3xl overflow-hidden">
        <div className="flex flex-col justify-around items-center h-full py-5">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 text-md font-medium text-center text-primary-900">
              {/* Type the text as you hear the audio */}
              སྒྲ་ཇི་བཞིན་ཡིག་འབེབ་བྱོས།
            </div>
          </div>
          <AudioPlayer tempAudioURL={currentValidation?.source_audio_url} />
          <textarea
            className="bg-neutral-100 rounded-lg text-xs resize-none focus:outline-none focus:ring-0 border placeholder:text-neutral-700 placeholder:text-xs placeholder:font-medium p-4 w-3/4 text-neutral-900"
            // placeholder="Start typing here..."
            placeholder="འདིར་ཡི་གེ་འབྲི།"
            rows={5}
            value={currentValidation?.contribution_text}
            readOnly={true}
          />
        </div>
      </div>
      <div className="row-span-4">
        <CurrentStatus totalNumbers={totalValidation} />
      </div>
      <div className="col-span-full">
        <div className="flex flex-row items-center justify-center h-full space-x-6">
          <ActionBtn
            text="ནོར་"
            style="bg-primary-700 text-sm font-monlam font-medium text-white"
            handleClick={() => handleSubmit(false)}
          />
          <ActionBtn
            text="འགྲིག"
            style="border border-neutral-950 text-sm font-monlam font-medium text-primary-900"
            handleClick={() => handleSubmit(true)}
          />
        </div>
      </div>
      <div className="col-span-full">
        <div className="flex items-start justify-end h-full">
          <ActionBtn
            text="མཆོང་།"
            style="justify-self-end bg-primary-700 text-sm font-monlam font-medium text-white mr-10"
            handleClick={handleSkip}
          />
        </div>
      </div>
    </div>
  );
}
