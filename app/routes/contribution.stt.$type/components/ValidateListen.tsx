import { useRef, useState } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn, { Correctbtn, Incorrectbtn, Skipbtn } from "~/components/Buttons";
import ValidateMore from "~/components/ValidateMore";
import AudioPlayer from "~/components/AudioPlayer";
import CurrentStatus from "~/components/CurrentStatus";
import Progressbar from "~/components/Progressbar";

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
    <div className="grid grid-cols-6 grid-rows-8 py-4 w-full h-full">
      <div className="row-span-6 hidden md:block" />
      <div className="col-span-6 md:col-span-4 row-span-7 md:row-span-6 bg-white shadow-md rounded-lg overflow-hidden mx-4">
        <div className="flex flex-col justify-around items-center h-full py-5 px-2 bg-white shadow-md rounded-lg relative">
                    <Progressbar totalNumbers={totalValidation} />
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 text-lg font-semibold font-monlam text-center text-primary-900">
              སྒྲ་ཇི་བཞིན་ཡིག་འབེབ་བྱོས།
            </div>
          </div>
          <AudioPlayer tempAudioURL={currentValidation?.source_audio_url} />
          <textarea
            className="bg-neutral-50 rounded-lg resize-none text-neutral-950 font-monlam text-lg font-medium leading-loose focus:outline-none focus:ring-0 border placeholder:text-neutral-700 placeholder:text-xs placeholder:font-medium py-6 px-4 w-full md:w-3/4  placeholder:font-monlam"
            placeholder="འདིར་ཡི་གེ་འབྲི།"
            rows={5}
            value={currentValidation?.contribution_text}
            readOnly={true}
          />
        </div>
      </div>
      <div className="row-span-6 place-content-center hidden md:block">
        <CurrentStatus totalNumbers={totalValidation} />
      </div>
      <div className="col-span-full place-content-center">
        <div className="flex flex-row items-center justify-center h-full space-x-2 md:space-x-6">
          <div className="md:hidden">
            <Skipbtn handleClick={handleSkip} />
          </div>
          <Incorrectbtn handleClick={() => handleSubmit(false)} />
          <Correctbtn handleClick={() => handleSubmit(true)} />
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
