import React, { useState } from "react";
import AudioPlayer from "../AudioPlayer";
import ActionBtn from "../utils/Buttons";
import { useLoaderData } from "@remix-run/react";
import { deleteValidation, updateListenValidation } from "./utils/api";

export default function ValidateListen() {
  const loaderData = useLoaderData();
  const [count, setcount] = useState(0);
  const listenValidation = loaderData?.validation || []
  console.log("validation data : ", loaderData?.validation)

  const handleNeedChange = async () => {
    setcount((p) => p + 1);
    const validationId = listenValidation[count].validation_id
    const res = await updateListenValidation(validationId, false)
    console.log("incorrect data : ", validationId)
  };
  const handleCorrect = async () => {
    setcount((p) => p + 1);
    const validationId = listenValidation[count].validation_id
    const res = await updateListenValidation(validationId, true)
    console.log("correct data : ", validationId)
  };
  const handleSkip = async () => {
    setcount((p) => p + 1);
    const validationId = listenValidation[count].validation_id
    const res = await deleteValidation(validationId)
    console.log("delete res : ",res)
  };

  const audioUrlList =  listenValidation.map(v => v.source_audio_url)
  const contributedText =  listenValidation.map(v => v.contribution_text)

  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      {count < 5 ? (
        <>
          <div className="flex flex-col items-center justify-around w-4/5 h-60 py-4 space-y-4  bg-primary-100 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-full">
              <div className="flex-1 text-lg font-medium text-center text-primary-900">
                Does this audio match the text?
              </div>
              <button
                disabled={count === 5}
                className="text-primary-900 text-sm font-medium underline cursor-pointer mr-6"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
            <AudioPlayer tempAudioURL={audioUrlList[count]} />
            <div className="flex items-center justify-center space-x-2 text-xl font-medium text-neutral-950">
              {contributedText[count]}
            </div>
            <div className="flex items-center justify-center space-x-2">
              <ActionBtn
                text="Incorrect"
                // isDisabled={translatedText.trim() === ""}
                style="bg-primary-700 text-xs font-medium text-white"
                handleClick={handleNeedChange}
              />
              <ActionBtn
                text="Correct"
                // isDisabled={translatedText.trim() === ""}
                style="bg-primary-700 text-xs font-medium text-white"
                handleClick={handleCorrect}
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
              You contributed 5 sentence(s) for your language!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
