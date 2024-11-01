import React, { useState } from "react";
import ActionBtn from "../utils/Buttons";
import { useLoaderData } from "@remix-run/react";
import { updateOCRContribution, prepareOCRContribution, deleteOCRConrtibution } from "./utils/api";
import { MdOutlineSpeakerGroup } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


export default function OcrComponent() {
  const navigate = useNavigate();
  const [translatedText, settranslatedText] = useState("");
  const loaderData = useLoaderData();
  const user_id = loaderData.user_id
  const ocrContribution = loaderData?.contribution || []
  const totalContribution = ocrContribution.length;
  console.log("ocr contribution : ",  ocrContribution)
  const handleCancel = () => {
    settranslatedText("");
  };
  const [count, setcount] = useState(() =>
    ocrContribution.map((item) => item.text).filter((text) => text !== "")
      .length);
  const handleSubmit = async () => {
    const contribution_id = ocrContribution[count].id;
    const res = await updateOCRContribution(contribution_id,  translatedText);
    console.log(res)
    settranslatedText("");
    setcount((p) => p + 1);
  };
  const handleSkip = async () => {
    
    const contribution_id = ocrContribution[count].id
    const res = await deleteOCRConrtibution(contribution_id)
    if(res.status = "success") {
      setcount((p) => p + 1);
    } else {
      alert("Error deleting contribution")
    }
    console.log(res)
  };

  const loadContributeData  = async () => {
    const response = await prepareOCRContribution(user_id)
    navigate(1);
    console.log(response)
  }

  const ocrUrl = ocrContribution.map(ocr => ocr.img_url )

  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      {count < totalContribution ? (
        <>
          <div className="flex flex-col items-center justify-around w-4/5 h-3/5 py-4 space-y-4  bg-primary-100 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-full">
              <div className="flex-1 text-md font-medium text-center text-primary-900">
                Type the text from the image
              </div>
              <button
                disabled={count === 5}
                className="text-primary-900 text-sm font-medium underline cursor-pointer mr-6"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
            <div className="w-3/5 h-1/5 overflow-x-auto">
              <img
                src={ocrUrl[count]}
                className="h-20 w-full object-cover"
                alt="manuscript"
              />
            </div>

            <textarea
              className="bg-white rounded-lg text-xs resize-none focus:outline-none focus:ring-0 border-0 placeholder:text-neutral-700 placeholder:text-xs placeholder:font-medium p-4 w-3/5 text-neutral-900"
              placeholder="Start typing here..."
              rows={5}
              value={translatedText}
              onChange={(e) => settranslatedText(e.target.value)}
            />
            <div className="flex items-center justify-center space-x-2">
              <ActionBtn
                text="Cancel"
                isDisabled={translatedText.trim() === ""}
                style="bg-primary-700 text-xs font-medium text-white"
                handleClick={handleCancel}
              />
              <ActionBtn
                text="Submit"
                isDisabled={translatedText.trim() === ""}
                style="border border-neutral-900 text-xs font-medium text-primary-900"
                handleClick={handleSubmit}
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-3/5 space-x-2">
            <div className="w-full bg-white rounded-full h-2.5">
              <div
                className="bg-primary-900 h-2.5 rounded-full"
                style={{ width: `${((count + 1) / totalContribution) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium">{count + 1}/{totalContribution}</span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-around w-4/5 h-48 bg-primary-100 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 text-sm font-medium text-center">
              {totalContribution === 0
                ? "You don't have enough data to contribution!"
                : `You have contributed to ${totalContribution} recording for your
              language !`}
              <button 
                onClick={loadContributeData}
                className="mx-52 my-5 flex items-center p-2 border border-neutral-950 bg-primary-100 rounded-sm shadow-sm"
                type="button"
              >
                <span className="text-primary-900 text-xs">Contribute more</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
