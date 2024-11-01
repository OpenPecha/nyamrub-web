import { FaArrowRightLong } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";

import { useState, useEffect } from "react";
import ActionBtn from "../utils/Buttons";
import ProgressBar from "../ProgressBar";
import { useLoaderData } from "@remix-run/react";
import validateText from "./utils/validate";
import deleteValidation from "./utils/deleteValidation";

export default function ValidateSegment() {
  const loaderData = useLoaderData();
  const validationData = loaderData?.validation || [];
  const totalValidation = validationData.length
  const [progressData, setProgressData] = useState({});
  const [count, setcount] = useState(
    () => validationData.filter((data) => data.is_valid !== null).length
  );

  const updateIsValid = async (is_valid: boolean) => {
    const res = await validateText(
      validationData[count].validation_id,
      is_valid
    );
    if (res.status === "success") {
      setcount(count + 1);
    }
  };

  const handleSkip = async () => {
    const res = await deleteValidation(validationData[count].validation_id);
    if (res.status === "success") {
      setcount(count + 1);
    }
  };
  useEffect(() => {
    setProgressData({ count: count + 1, length: totalValidation });
  }, [count]);
  
  return (
    <>
      {count < totalValidation ? (
        <>
          <div className="flex flex-col items-center justify-center w-full h-full shadow-md rounded-lg  border bg-primary-100">
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
                onClick={handleSkip}
              >
                Skip
              </span>
            </p>
            <div className="translation_input flex flex-row items-center w-full h-full ">
              <div className="text-sm p-3 ml-10 bg-white flex-1 w-full h-4/5  rounded-l-lg resize-none overflow-hidden border-r border-neutral-900">
                <p className="text-primary-900">English</p>
                <textarea
                  className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
                  placeholder="There is no source segment available now"
                  value={validationData[count]?.source}
                  readOnly={true}
                ></textarea>
              </div>
              <div className="text-sm p-3 mr-10 bg-white flex-1 w-full h-4/5  rounded-r-lg resize-none overflow-hidden">
                <p className="text-primary-900">Tibetan</p>
                <textarea
                  className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
                  placeholder="Type something..."
                  value={validationData[count].text}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="translation_button flex flex-row items-center justify-center my-5 space-x-6">
              <ActionBtn
                text="Incorrect"
                style="bg-primary-700 text-xs font-medium text-white"
                handleClick={() => updateIsValid(false)}
              />
              <ActionBtn
                text="Correct"
                style="bg-primary-700 text-xs font-medium text-white"
                handleClick={() => updateIsValid(true)}
              />
            </div>
          </div>
          <ProgressBar data={progressData} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-around w-4/5 h-48 bg-primary-100 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 text-sm font-medium text-center">
              {totalValidation === 0
                ? "You dont have enough record to validate"
                : "Thank you for contribute to your language!!"}
              {totalValidation === 0 && <div>Kindly wait!!</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
