import { useRef, useState } from "react";
import ActionBtn from "../utils/Buttons";
import { CiHeadphones } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoRepeat } from "react-icons/io5";
import { useLoaderData } from "@remix-run/react";
import validateAudio from "./utils/validateAudio";

export default function ValidateAudio() {
  const loaderData = useLoaderData();
  const speak_validations = loaderData.user[1];
  console.log("speak validation", speak_validations);
  const [isListening, setisListening] = useState(false);
  const [listened, setlistened] = useState(false);
  const [count, setcount] = useState(
    () =>
      speak_validations
        .map((item) => item.is_valid)
        .filter((item) => item !== null).length
  );
  const audioRef = useRef(null);
  const demoAudioUrl =
    "https://monlam-test.s3.ap-south-1.amazonaws.com/BashaDan/speak/1729680378097-recording.mp3";
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

  const handleSubmit = async(is_valid: boolean) => {
    const validation_id = speak_validations[count].validation_id;
    const res = await validateAudio(validation_id, is_valid);
    if (res.status === "success") {
      setcount(count + 1);
    }
    setisListening(false);
    setlistened(false);
    
  };

  const sourceText = speak_validations.map((item) => item.source_text);
  const contributedAudio = speak_validations.map(
    (item) => item.contribution_url
  );
  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      {count < 5 ? (
        <>
          <div className="flex flex-col items-center justify-around w-4/5 h-48 space-y-4 bg-primary-100 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-full text-2xl text-center">
              {sourceText[count]}
            </div>

            <div className="">
              <audio
                src={demoAudioUrl}
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
                text="X incorrect"
                isDisabled={isListening || !listened}
                style="bg-primary-700 text-xs font-medium text-white"
                handleClick={()=>handleSubmit(false)}
              />
              <ActionBtn
                text="Y correct"
                isDisabled={isListening || !listened}
                style="bg-primary-700 text-xs font-medium text-white"
                handleClick={()=>handleSubmit(true)}
              />
            </div>
          </div>

          <div className="flex items-center justify-center w-3/5 space-x-2">
            <div className="w-full bg-white rounded-full h-2.5">
              <div
                className="bg-primary-900 h-2.5 rounded-full"
                style={{ width: `${((count + 1) / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium">{count + 1}/5</span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-around w-4/5 h-48 bg-primary-100 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 text-sm font-medium text-center">
              You have Validate to 5 recording for your language !
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
