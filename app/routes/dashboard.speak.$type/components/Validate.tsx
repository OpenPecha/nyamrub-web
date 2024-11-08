import { useRef, useState } from "react";
import { CiHeadphones } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoRepeat } from "react-icons/io5";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn from "../../../components/Buttons";
import ProgressBar from "~/components/ProgressBar";

export default function ValidateAudio() {
  const loaderData = useLoaderData();
  const fetcher = useFetcher();
  const speak_validations = loaderData?.data || [];
  const userId = loaderData?.user_id;
  const totalValidation = speak_validations.length;
  const [isListening, setisListening] = useState(false);
  const [listened, setlistened] = useState(false);
  const [count, setcount] = useState(
    () =>
      speak_validations
        ?.map((item) => item.is_valid)
        .filter((item) => item !== null).length
  );
  const audioRef = useRef(null);
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
    const validation_id = speak_validations[count].validation_id;
    fetcher.submit({ validation_id }, { method: "DELETE", action: "/api/tts/validate" });
  };

  const handleSubmit = async (is_valid: boolean) => {
    const validation_id = speak_validations[count].validation_id;
    const formData = new FormData();
    formData.append("validation_id", validation_id);
    formData.append("is_valid", is_valid);
    fetcher.submit(formData, {method:"PUT",action:"/api/tts/validate"});
    if (fetcher.data?.status === "success") {
      setcount(count + 1);
    }
    setisListening(false);
    setlistened(false);
  };

  const handleLoadMore = async () => {
    fetcher.submit({userId}, { method: "GET", action: "/api/tts/assign-contribution" });
  };
  const sourceText = speak_validations.map((item) => item.source_text);
  const contributedAudio = speak_validations.map(
    (item) => item.contribution_url
  );
  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      {count < totalValidation ? (
        <>
          <div className="flex flex-col items-center justify-around w-4/5 h-48 space-y-4 bg-primary-100 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-full text-2xl text-center">
              <span className="flex-1">{sourceText[count]}</span>
              <button
                disabled={count === 5}
                className="text-primary-900 text-sm font-medium underline cursor-pointer mr-6"
                onClick={handleSkip}
              >
                {/* Skip */}
                མཆོང་།
              </button>
            </div>

            <div className="">
              <audio
                src={contributedAudio[count]}
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

          <ProgressBar completed={count + 1} total={totalValidation} />
          </>
      ) : (
        <div className="flex flex-col items-center justify-around w-4/5 h-48 bg-primary-100 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full">
            <div className="text-sm font-medium text-center">
              {totalValidation === 0
                ? "Thank you for your contribution!!"
                : `You have contributed to ${totalValidation} recording for your
              language !`}
              <button
                onClick={handleLoadMore}
                className="mx-52 my-5 flex items-center p-2 border border-neutral-950 bg-primary-100 rounded-sm shadow-sm"
                type="button"
              >
                {/* <span className="text-primary-900 text-xs">Validate more</span> */}
                <span className="text-primary-900 text-xs">
                  བརྟག་དཔྱད་མང་བ་གནང་
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
