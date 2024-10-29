import { FaArrowRightLong } from "react-icons/fa6";
import { useState, useEffect, useSyncExternalStore } from "react";
import ProgressBar from "../ProgressBar";
import ActionBtn from "../utils/Buttons";

export default function WriteComponent() {
  const [sourceSegment, setSourceSegment] = useState("");
  const [targetSegment, setTargetSegment] = useState("");
  const [segmentPayload, setSegmentPayload] = useState({});
  const [count, setCount] = useState(0);
  const [translationDone, setTranslationDone] = useState(false);
  const [progressData, setProgressData] = useState({});

  const soureSegmentsData = [
    "སློབ་སྦྱོང་ཡར་རྒྱས་གཏོང་བའི་ཆེད་དུ་བྱེད་སྒོ་སྤེལ་བ་རེད།",
    "hi how are you",
    "སློབ་སྦྱོང་ཡར་རྒྱས་གཏོང་བའི་ཆེད་དུ་བྱེད་སྒོ་སྤེལ་བ་རེད།",
    "where are you",
    "how are you doing",
  ];

  const handleTargetSegment = (e) => {
    setTargetSegment(e.target.value);
    console.log(targetSegment);
  };

  const onSegmentsSubmit = (e) => {
    e.preventDefault();
    if (count < soureSegmentsData.length) {
      setCount(count + 1);
      const payload = {
        source: {
          text: sourceSegment,
          language: "english",
        },
        target: {
          text: targetSegment,
          language: "tibetan",
        },
        user: "dummy user",
      };
      setSegmentPayload(payload);
      setSourceSegment(soureSegmentsData[count]);
      setProgressData({
        count: count + 1,
        length: soureSegmentsData.length,
      });
      setTargetSegment("");
    } else {
      setTranslationDone(true);
    }
  };

  const onCancel = () => {
    setTargetSegment(""), setSegmentPayload("");
  };

   useEffect(() => {
     setSourceSegment(soureSegmentsData[count]);
     setCount(count + 1);
   }, []);
  return (
    <>
      {translationDone ? (
        <div className="flex flex-col justify-center items-center w-full h-full bg-primary-100 rounded-lg shadow-md">
          Translation Completed
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
            <p className="flex items-center justify-end mr-4 text-border-primary-700">
              <span className=" flex items-cente justify-center text-sm w-10 border-b-2 hover:border-primary-700 text-primary-900">
                Skip
              </span>
            </p>
            <div className="translation_input flex flex-row items-center w-full h-full ">
              <div className="text-sm p-3 ml-10 bg-white flex-1 w-full h-full  rounded-l-lg border-r border-neutral-900 resize-none overflow-hidden">
                <p className="text-primary-900">English</p>
                <textarea
                  className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
                  placeholder="There is no source segment available now"
                  value={sourceSegment}
                  readOnly={true}
                ></textarea>
              </div>
              <div className="text-sm p-3 mr-10 bg-white flex-1 w-full h-full  rounded-r-lg resize-none overflow-hidden">
                <p className="text-primary-900">Tibetan</p>
                <textarea
                  className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
                  placeholder="Type something..."
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
