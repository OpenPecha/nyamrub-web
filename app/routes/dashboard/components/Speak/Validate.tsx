import { useRef, useState } from "react";
import ActionBtn from "../utils/Buttons";
import { CiHeadphones } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoRepeat } from "react-icons/io5";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import validateAudio from "./utils/validateAudio";
import deleteValidation from "./utils/deleteValidation";
import { prepareTTSValidations } from "./utils/getData";

export default function ValidateAudio() {
  const loaderData = useLoaderData();
  const revalidator = useRevalidator();
  const speak_validations = loaderData?.validation || [];
  console.log("validation : ", speak_validations);
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
    const res = await deleteValidation(validation_id);
    if (res.status === "success") {
      setcount(count + 1);
    }
  };
  const handleSubmit = async (is_valid: boolean) => {
    const validation_id = speak_validations[count].validation_id;
    const res = await validateAudio(validation_id, is_valid);
    if (res.status === "success") {
      setcount(count + 1);
    }
    setisListening(false);
    setlistened(false);
  };

  const handleLoadMore = async () => {
    const res = await prepareTTSValidations(loaderData?.user_id);
    revalidator.revalidate();
    if (res.status === "success") {
      console.log("Load more data");
    }
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

          <div className="flex items-center justify-center w-3/5 space-x-2">
            <div className="w-full bg-white rounded-full h-2.5">
              <div
                className="bg-primary-900 h-2.5 rounded-full"
                style={{
                  width: `${((count + 1) / totalValidation) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs font-medium">
              {count + 1}/{totalValidation}
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-around w-4/5 h-48 bg-primary-100 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full">
            <div className="text-sm font-medium text-center">
              {totalValidation === 0
                // ? "Thank you for your contribution!!"
                ? "ཁྱེད་ཀྱིས་རོགས་རམ་གནང་བར་ཐུགས་རྗེ་ཆེ།"
                : `You have contributed to ${totalValidation} recording for your
              language !`}
              <button
                onClick={handleLoadMore}
                className="mx-52 my-5 flex items-center p-2 border border-neutral-950 bg-primary-100 rounded-sm shadow-sm"
                type="button"
              >
                {/* <span className="text-primary-900 text-xs">Validate more</span> */}
                <span className="text-primary-900 text-xs">བསྐྱར་དུ་ཞུ་དག་གནང་རོགས།</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}