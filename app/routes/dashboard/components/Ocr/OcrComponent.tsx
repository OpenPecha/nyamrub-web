import React, { useState } from "react";
import ActionBtn from "../utils/Buttons";

export default function OcrComponent() {
  const [count, setcount] = useState(0);
  const [translatedText, settranslatedText] = useState("");
  const handleCancel = () => {
    settranslatedText("");
  };
  const handleSubmit = () => {
    setcount((p) => p + 1);
    settranslatedText("");
  };
  const handleSkip = () => {
    setcount((p) => p + 1);
  };
    const demoImages = [
        "https://media.istockphoto.com/id/145239812/photo/ancient-script-and-prayer-beads.jpg?s=1024x1024&w=is&k=20&c=A5him6fYN_0FC798lp_S3d_wwkpSDVHE07Zk9JmptOU=",
        "https://media.istockphoto.com/id/1455959667/photo/scenes-from-the-ramayana.jpg?s=1024x1024&w=is&k=20&c=LbT-w5HwBqt0WtX00LGWDGOKaJmspF0m47h8vtCVIbk=",
        "https://images.unsplash.com/photo-1528459135417-42dfc609ce87?q=80&w=2258&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://media.istockphoto.com/id/1491061335/vector/example-of-sanskrit-script-in-the-devanagari-character-from-the-bhagavat-gita-a-700-verse.jpg?s=1024x1024&w=is&k=20&c=oRCliLwCTDi7Jam2LA7-yZqscXiLBe0T2JgS38DHIFg=",
        "https://media.istockphoto.com/id/1822679916/vector/examples-of-sanskrit-writing-17th-and-18th-century-history-of-language-universal-palaeography.jpg?s=1024x1024&w=is&k=20&c=oMWkmYNGsSPZym5dCRVd4FF-CVQQz4URx6gSMRWlWgw=",
    ]
  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      {count < 5 ? (
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
                src={demoImages[count]}
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
                style={{ width: `${((count + 1) / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium">{count + 1}/5</span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-around w-4/5 h-48 bg-primary-100 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 text-sm font-medium text-center text-primary-900">
              You contributed 2 image OCR(s) for your language!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
