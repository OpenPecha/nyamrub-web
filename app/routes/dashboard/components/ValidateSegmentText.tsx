import { FaArrowRightLong } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";

import { useState, useEffect } from "react";

export default function ValidateSegment() {

  const [sourceSegment, setSourceSegment] = useState("This is source segment text");
  const [targetSegment, setTargetSegment] = useState("this is source text");
  const [canEdit, setCanEdit] = useState(false);
  const [segmentPayload,  setSegmentPayload] = useState({});

  const handleTargetSegment = (e) => {
    setTargetSegment(e.target.value)
    console.log(targetSegment)
  } 

  const onSegmentsCorrect = (e) => {
    e.preventDefault()
    const payload = {
      source: {
        text: sourceSegment,
        language:  "english"
      },
      target: {
        text: targetSegment,
        language: "tibetan"
      },
      user: "dummy user"
    }
    setSegmentPayload(payload)
    console.log("my payload",segmentPayload)
  }

  const onEdit = () => {
    setCanEdit(true)

  }

  return (
    <div className="flex flex-col justify-center w-full h-full bg-primary-100 rounded-lg shadow-md">
      <div className="translation_language_label flex flex-row justify-center items-center mt-4">
        <div className=" flex items-center justify-center border-2 rounded-sm px-4 py-1 border-neutral-700 text-xs">English</div>
        <FaArrowRightLong className="text-neutral-900 mx-4 my-2" />
        <div className="flex items-center justify-center border-2 rounded-sm px-4 py-1 border-neutral-700 text-xs">བོད་ཡིག་</div>
      </div>
      <p className="flex items-center justify-end mr-4 text-border-primary-700">
      <span className=" flex items-cente justify-center text-sm w-10 border-b-2 hover:border-primary-700 text-primary-900">Skip</span>
      </p>
      <div className="translation_input flex flex-row items-center w-full h-full ">
        <div className="text-sm p-3 ml-10 bg-white flex-1 w-full h-4/5  rounded-l-lg border-r-2 border-black resize-none overflow-hidden">
          <p className="text-primary-900">English</p>
          <textarea className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
            placeholder="There is no source segment available now"
            value={sourceSegment}
            readOnly={true}
          ></textarea>
        </div>
        <div className="text-sm p-3 mr-10 bg-white flex-1 w-full h-4/5  rounded-r-lg border-l-1 border-black resize-none overflow-hidden">
          <p className="text-primary-900">Tibetan</p>
          <textarea className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
            placeholder="Type something..."
            value={targetSegment}
            onInput={handleTargetSegment}
            readOnly={!canEdit}
          />
        </div>
      </div> 
      <div className="translation_button flex flex-row items-center justify-center mb-5 space-x-6">
        <button className="flex items-center justify-center border-2 rounded-md bg-primary-500  border-primary-500 text-xs text-white py-2 px-6 hover" onClick={onEdit}>Need Change</button>
        <button className="flex items-center justify-center border-2 rounded-md border-neutral-700 bg-primary-100 text-xs text-primary-900 py-2 px-6 hover" onClick={onSegmentsCorrect}>
        <TiTick className="text-neutral-900" />Correct</button>
      </div>
    </div>
  );
}
