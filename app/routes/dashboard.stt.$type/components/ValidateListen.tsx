import React, { useEffect, useState } from "react";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import {
  deleteValidation,
  updateListenValidation,
  prepareSTTValidation,
  showListenValidation,
} from "../utils/api";
import ActionBtn from "~/components/Buttons";
import AudioPlayer from "~/components/AudioPlayer";
import ProgressBar from "~/components/ProgressBar";

export default function ValidateListen() {
  const loaderData = useLoaderData();
  console.log("loaderData ::::", loaderData);
  const revalidator = useRevalidator();
  const [listenValidations, SetListenValidation] = useState(
    loaderData?.data || []
  );
  const user_id = loaderData.user_id;

  const [count, setcount] = useState(
    () =>
      listenValidations.map((item) => item.text).filter((text) => text == "")
        .length
  );

  const totalValidation = listenValidations.length;

  const handleNeedChange = async () => {
    setcount((p) => p + 1);
    const validationId = listenValidations[count].validation_id;
    const res = await updateListenValidation(validationId, false);
  };
  const handleCorrect = async () => {
    setcount((p) => p + 1);
    const validationId = listenValidations[count].validation_id;
    const res = await updateListenValidation(validationId, true);
  };
  const handleSkip = async () => {
    setcount((p) => p + 1);
    const validationId = listenValidations[count].validation_id;
    const res = await deleteValidation(validationId);
  };

  const onPrepareListenValidation = async () => {
    try {
      const res = await prepareSTTValidation(user_id);
      if (res.status == "success") {
        const sttvalication = await showListenValidation(user_id);
        SetListenValidation(sttvalication.data || []);
        revalidator.revalidate();
      } else {
        alert("Not able to assign contributed data for validation");
      }
    } catch (err) {
      console.log("Error loadind stt validation data", err);
    }
  };

  const audioUrlList = listenValidations.map((v) => v.source_audio_url);
  const contributedText = listenValidations?.map((v) => v.contribution_text);

  useEffect(() => {
    setcount(
      () =>
        listenValidations.map((item) => item.text).filter((text) => text == "")
          .length
    );
  }, [loaderData]);
  console.log("count", count);
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
          <ProgressBar completed={count} total={totalValidation} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-around w-4/5 h-48 bg-primary-100 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full">
            <div className="text-sm font-medium text-center">
              {totalValidation === 0
                ? "Thank you for your validation."
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
