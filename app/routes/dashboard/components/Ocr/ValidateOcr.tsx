import React, { useState, useEffect } from "react";
import ActionBtn from "../utils/Buttons";
import { useLoaderData } from "@remix-run/react";
import { prepareOCRValidation, deleteValidation, updateOCRValidation, showOCRValidation } from "./utils/api";


export default function ValidateOcr() {

  const [ocrValidations, setOcrValidations] = useState([])
  const loaderData = useLoaderData()
  const user_id = loaderData.user_id

  const [count, setcount] = useState(0);

  useEffect(()=> {
    setOcrValidations(loaderData?.validation || [])
    setcount(() =>
      ocrValidations.map((item) => item.text).filter((text) => text == "")
        .length)
  }, [loaderData])

  const totalValidation = ocrValidations.length
  // correct validation
  const handleIncorrect = async () => {
    const validationId = ocrValidations[count].validation_id
    const res = await updateOCRValidation(validationId, true )
    if (res.status == "success") {
     setcount((p) => p + 1);
    } else {
     console.log("error updating validation")
    }
  };
  const handleCorrect = async () => {
    const validationId = ocrValidations[count].validation_id
    const res = await updateOCRValidation(validationId, false )
    if (res.status == "success") {
     setcount((p) => p + 1);
    } else {
     console.log("error updating validation")
    }
  }

  const handleSkipValidation = async () => {
    const validationId = ocrValidations[count].validation_id
    const res = await deleteValidation(validationId)
    if (res.status = "success") {
      setcount((p) => p + 1);
      console.log("Validation deleted successfully:", res)
    } else {
      console.log("error  deleting validation")
    }
  };

  const onPrepareOCRValidation = async () => {
    const res = await prepareOCRValidation(user_id)
    if(res.status = "success") {
      let ocrValidation = await showOCRValidation(user_id)
      setOcrValidations(ocrValidation.data)
    } else {
      alert("Not able to assign contributed data for validation")
    }

  }
  const ocr_url = ocrValidations.map(v => v.source_img_url )
  const ocr_text = ocrValidations.map(v => v.text )
  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      {count < totalValidation ? (
        <>
          <div className="flex flex-col items-center justify-around w-4/5 h-3/5 py-4 space-y-4 bg-primary-100 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-full">
              <div className="flex-1 text-md font-medium text-center text-primary-900">
                Type the text from the image
              </div>
              <button
                disabled={count === 5}
                className="text-primary-900 text-sm font-medium underline cursor-pointer mr-6"
                onClick={handleSkipValidation}
              >
                Skip
              </button>
            </div>
            <div className="w-3/5 h-1/5 overflow-x-auto">
              <img
                src={ocr_url[count]}
                className="h-20 w-full object-cover"
                alt="manuscript"
              />
            </div>

            <div className="bg-white px-4 py-2 text-left w-3/5 h-1/4">
              <div className="text-neutral-500 text-xs">Captured Text</div>
              <p className="text-neutral-800 text-sm">{ocr_text[count]}</p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <ActionBtn
                text="Incorrect"
                style="bg-primary-700 text-xs font-medium text-white"
                handleClick={handleIncorrect}
              />
              <ActionBtn
                text="Correct"
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
      ) : (
        <div className="flex flex-col items-center justify-around w-4/5 h-48 bg-primary-100 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 text-sm font-medium text-center">
              {totalValidation === 0
                ? "You don't have enough data ot Validated!"
                : `You have validated  ${totalValidation}  OCR contributed data
              language !`}
              <button 
                onClick={onPrepareOCRValidation}
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
