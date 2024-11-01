import React, { useEffect, useState } from "react";
import AudioPlayer from "../AudioPlayer";
import ActionBtn from "../utils/Buttons";
import { useLoaderData } from "@remix-run/react";
import { deleteValidation, updateListenValidation, prepareSTTValidation, showListenValidation } from "./utils/api";

export default function ValidateListen() {
  const loaderData = useLoaderData();
  const [listenValidations, SetListenValidation] = useState([])
  const user_id = loaderData.user_id
  
  console.log("validation data : ", loaderData?.validation)
  const [count, setcount] = useState(0);

  useEffect(() => {
    SetListenValidation(loaderData?.validation || [])
    setcount(
      () =>
        listenValidations.map((item) => item.text).filter((text) => text == "").length
    )
  }, [loaderData])
  const totalValidation = listenValidations.length

  const handleNeedChange = async () => {
    setcount((p) => p + 1);
    const validationId = listenValidations[count].validation_id
    const res = await updateListenValidation(validationId, false)
    console.log("incorrect data : ", validationId)
  };
  const handleCorrect = async () => {
    setcount((p) => p + 1);
    const validationId = listenValidations[count].validation_id
    const res = await updateListenValidation(validationId, true)
    console.log("correct data : ", validationId)
  };
  const handleSkip = async () => {
    setcount((p) => p + 1);
    const validationId = listenValidations[count].validation_id
    const res = await deleteValidation(validationId)
    console.log("delete res : ",res)
  };

  const onPrepareListenValidation = async () => {
    try {
      const res = await prepareSTTValidation(user_id)
      if(res.status = "success") {
        const sttvalication = await showListenValidation(user_id)
        SetListenValidation(sttvalication.data || [])
        setcount(0)
      } else {
        alert("Not able to assign contributed data for validation")
      }
    } catch(err) {
      console.log(err)
    }
  }

  const audioUrlList =  listenValidations.map(v => v.source_audio_url)
  const contributedText =  listenValidations.map(v => v.contribution_text)

  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      {count < totalValidation ? (
        <>
          <div className="flex flex-col items-center justify-around w-4/5 h-60 py-4 space-y-4  bg-primary-100 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-full">
              <div className="flex-1 text-lg font-medium text-center text-primary-900">
                Does this audio match the text?
              </div>
              <button
                disabled={count === totalValidation}
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
                style={{ width: `${((count + 1) / totalValidation) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium">{count + 1}/{totalValidation}</span>
          </div>
        </>
      ) :  (
        <div className="flex flex-col items-center justify-around w-4/5 h-48 bg-primary-100 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 text-sm font-medium text-center">
              {totalValidation === 0
                ? "You don't have enough data ot Validated!"
                : `You have validated  ${totalValidation}  OCR contributed data
              language !`}
              <button 
                onClick={onPrepareListenValidation}
                className="mx-52 my-5 flex items-center p-2 border border-neutral-950 bg-primary-100 rounded-sm shadow-sm"
                type="button"
              >
                <span className="text-primary-900 text-xs">Validate more</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
