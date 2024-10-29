import { FaArrowRightLong } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";

import { useState, useEffect } from "react";
import ActionBtn from "../utils/Buttons";
import ProgressBar from "../ProgressBar";

export default function ValidateSegment() {
  const [contributedData, setContributedData] = useState([
    {
      sourctText: "this is source text",
      targetText: "this is target text",
      is_valid: true,
    },
    {
      sourctText: "How are you doing",
      targetText: "I am not good but i am fine",
      is_valid: null,

    },
    {
      sourctText: "Good morning",
      targetText: "Thank you very much",
      is_valid: null,

    },
    {
      sourctText: "What makes you happy",
      targetText: "working in monlam",
      is_valid: null,

    },
    {
      sourctText: "One last to go",
      targetText: "Thank you!!!",
      is_valid: null,

    },
  ]
  );
  const [targetSegment, setTargetSegment] = useState("this is source text");
  const [canEdit, setCanEdit] = useState(false);
  const [segmentPayload, setSegmentPayload] = useState({});

  const handleTargetSegment = (e) => {
    setTargetSegment(e.target.value);
    console.log(targetSegment);
  };

  const updateIsValid = (index, newIsValidValue) => {
    setContributedData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, is_valid: newIsValidValue } : item
      )
    );
  };

  const handleSkip = (index,skip) => {
    setContributedData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, is_valid: skip } : item
      )
    );
  }
  const count = (contributedData.filter((data) => data.is_valid !== null)).length;
  return (
    <>
      <div className="flex flex-col justify-center w-full h-full bg-primary-100 rounded-lg shadow-md border">
        {count < 5 ? (
          <>
            <div className="translation_language_label flex flex-row justify-center items-center mt-4">
              <div className=" flex items-center justify-center border rounded-sm px-4 py-1 border-neutral-800 text-xs">
                English
              </div>
              <FaArrowRightLong className="text-neutral-900 mx-4 my-2" />
              <div className="flex items-center justify-center border rounded-sm px-4 border-neutral-800 text-md">
                བོད་ཡིག་
              </div>
            </div>
            <p className="flex items-center justify-end mr-4 text-border-primary-700">
              <span
                className=" flex items-cente justify-center text-sm w-10 underline text-primary-900 cursor-pointer"
                onClick={()=>handleSkip(count,undefined)}
              >
                Skip
              </span>
            </p>
            <div className="translation_input flex flex-row items-center w-full h-full ">
              <div className="text-sm p-3 ml-10 bg-white flex-1 w-full h-4/5  rounded-l-lg \ resize-none overflow-hidden border-r border-neutral-900">
                <p className="text-primary-900">English</p>
                <textarea
                  className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
                  placeholder="There is no source segment available now"
                  value={contributedData[count].sourctText}
                  readOnly={true}
                ></textarea>
              </div>
              <div className="text-sm p-3 mr-10 bg-white flex-1 w-full h-4/5  rounded-r-lg resize-none overflow-hidden">
                <p className="text-primary-900">Tibetan</p>
                <textarea
                  className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
                  placeholder="Type something..."
                  value={contributedData[count].targetText}
                  onInput={handleTargetSegment}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="translation_button flex flex-row items-center justify-center my-5 space-x-6">
              <ActionBtn
                text="Incorrect"
                style="bg-primary-700 text-xs font-medium text-white"
                handleClick={() => updateIsValid(count, false)}
              />
              <ActionBtn
                text="Correct"
                style="bg-primary-700 text-xs font-medium text-white"
                handleClick={() => updateIsValid(count, true)}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-around w-full h-48 bg-primary-100 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-full">
              <div className="flex-1 text-sm font-medium text-center">
                Thank you for contribute to your language
              </div>
            </div>
          </div>
        )}
      </div>
      <ProgressBar data={{ count, length: contributedData.length }} />
    </>
  );
}
