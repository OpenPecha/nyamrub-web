import { FaArrowRightLong } from "react-icons/fa6";
import { useState, useEffect, useSyncExternalStore } from "react";
import ProgressBar from "../ProgressBar";
import ActionBtn from "../utils/Buttons";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import contributeText from "./utils/contributeText";
import deleteContribution from "./utils/deleteContribution";
import { prepareMTContribution } from "./utils/prepareData";

export default function WriteComponent() {
  const loaderData = useLoaderData()
  const revalidator = useRevalidator()
  const write_contribution = loaderData?.contribution || [];
  const totalContribution = write_contribution.length;
  const [targetSegment, setTargetSegment] = useState("");
  const [segmentPayload, setSegmentPayload] = useState({});
  
  const [progressData, setProgressData] = useState({});
  const [count, setCount] = useState(
    () =>
      write_contribution
        .map((item) => item.target)
        .filter((target_text) => target_text !== "").length
  );

  const handleTargetSegment = (e) => {
    setTargetSegment(e.target.value);
  };
  const handleSkip = async() => {
    const res = await deleteContribution(write_contribution[count].id);
    console.log(res)
    if(res.status === "success"){
      setCount(count + 1);
      setTargetSegment("");
    }
  }
  const onSegmentsSubmit = async(e) => {
    e.preventDefault();
    const res = await contributeText(write_contribution[count].id, targetSegment);
    if (res.status === 'success'){
      setCount(count + 1);
      setTargetSegment("");}
  };

  const onCancel = () => {
    setTargetSegment(""), setSegmentPayload("");
  };
  
  const soureSegmentsData = write_contribution.map((item) => item.source);
  
   const handleLoadMore = async () => {
     const res = await prepareMTContribution(loaderData?.user_id);
     revalidator.revalidate();
     if (res.status === "success") {
       console.log("Load more data");
     }
  };
  
  useEffect(() => {
    setProgressData({ count: count+1, length: write_contribution.length });
  }, [count]);

  return (
    <>
      {count >= totalContribution ? (
        <div className="flex flex-col items-center justify-around w-4/5 h-48 bg-primary-100 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 text-sm font-medium text-center">
              {totalContribution === 0
                ? "Thank you for your contribution!!"
                : `You have contributed to ${totalContribution} recording for your
              language !`}
              <button
                onClick={handleLoadMore}
                className="mx-52 my-5 flex items-center p-2 border border-neutral-950 bg-primary-100 rounded-sm shadow-sm"
                type="button"
              >
                <span className="text-primary-900 text-xs">
                  {/* Contribute more */}
                  རོགས་འདེགས་གང་མང་གནང་རོགས།
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center w-full h-full bg-primary-100 rounded-lg shadow-md">
            <div className="translation_language_label flex flex-row justify-center items-center mt-4">
              <div className=" flex items-center justify-center border rounded-sm px-4 py-1 border-neutral-800 text-xs">
                English
              </div>
              <FaArrowRightLong className="text-neutral-900 mx-4 my-2" />
              <div className="flex items-center justify-center border rounded-sm px-4 border-neutral-800 text-md">
                བོད་ཡིག་
              </div>
            </div>
            <button
              disabled={count === 5}
              className="text-right text-primary-900 text-sm font-medium underline cursor-pointer mr-6"
              onClick={handleSkip}
            >
              {/* Skip */}
              མཆོང་།
            </button>
            <div className="translation_input flex flex-row items-center w-full h-full ">
              <div className="text-sm p-3 ml-10 bg-white flex-1 w-full h-full  rounded-l-lg border-r border-neutral-900 resize-none overflow-hidden">
                <p className="text-primary-900">English</p>
                <textarea
                  className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
                  placeholder="There is no source segment available now"
                  value={soureSegmentsData[count]}
                  readOnly={true}
                ></textarea>
              </div>
              <div className="text-sm p-3 mr-10 bg-white flex-1 w-full h-full  rounded-r-lg resize-none overflow-hidden">
                {/* <p className="text-primary-900">Tibetan</p> */}
                <p className="text-primary-900">བོད་ཡིག་</p>
                <textarea
                  className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
                  // placeholder="Type something..."
                  placeholder="འདིར་ཡི་གེ་འབྲི།"
                  value={targetSegment}
                  onInput={handleTargetSegment}
                />
              </div>
            </div>
            <div className="translation_button flex flex-row items-center justify-center my-5 space-x-6">
              <ActionBtn
                text="Cancel"
                isDisabled={targetSegment.trim() === ""}
                style="flex items-center justify-center rounded-md bg-primary-700  text-xs text-white py-2 px-6"
                handleClick={onCancel}
              />
              <ActionBtn
                text="Submit"
                isDisabled={targetSegment.trim() === ""}
                style="border border-neutral-900 text-xs font-medium text-primary-900"
                handleClick={onSegmentsSubmit}
              />
            </div>
          </div>
          <ProgressBar data={progressData} />
        </>
      )}
    </>
  );
}
