import { useState } from "react";
import { MdOutlineSpeakerGroup } from "react-icons/md";
import SpeakComponent from "./Speak/SpeakComponent";
import ListenComponent from "./Listen/ListenComponent";
import WriteComponent from "./Write/WriteComponent";
import ValidateAudio from "./Speak/Validate";
import ValidateSegmentText from "./Write/ValidateSegmentText";
import ValidateListen from "./Listen/ValidateListen";
import OcrComponent from "./Ocr/OcrComponent";
import ValidateOcr from "./Ocr/ValidateOcr";

interface RightSectionProps {
  currentTab: string;
}

export default function RightSection({ currentTab }: RightSectionProps) {
  const [activeTab, setActiveTab] = useState("speak");

  const data = {
    Speak: {
      title: "Speak",
      subTitle: "Enrich your language by donating your voice",
      tabTitle: "Speak",
      tabDescription: "Contribute your voice",
      heading: "Speak / Record",
    },
    Listen: {
      title: "Listen",
      subTitle: "Enrich your language by typing the audio that you hear",
      tabTitle: "Listen",
      tabDescription: "Type what you hear",
      heading: "Listen Tibet / Transcribe",
    },
    Write: {
      title: "Write",
      subTitle: "Enrich your language by translating text",
      tabTitle: "Transcribe",
      tabDescription: "Translate and Type the Text",
      heading: "WRITE Tibet / Translate",
    },
    OCR: {
      title: "Ocr",
      subTitle: "Enrich your language by translating text",
      tabTitle: "Label",
      tabDescription: "Type text as per the image",
      heading: "OCR Tibet / Speaker",
    },
  };

  
  const currentData = data[currentTab as keyof typeof data] || data.Speak;
  return (
    <>
      <div className="flex flex-col items-center w-full h-fit">
        <div className="w-full max-w-3xl">
          <h1 className="text-2xl font-semibold mb-2 text-primary-900 uppercase">
            {currentData.title}
          </h1>
          <p className="mb-6 text-neutral-900 text-sm font-medium">
            {currentData.subTitle}
          </p>

          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("speak")}
              className={`py-5 px-6 border-x border-t border-primary-900  rounded-t-lg ${
                activeTab === "speak"
                  ? "bg-primary-700 text-white"
                  : "bg-primary-200 text-primary-900"
              }`}
            >
              <div className="text-left font-lg font-medium">
                {currentData.tabTitle}
              </div>
              <div className="text-xs">{currentData.tabDescription}</div>
            </button>
            <button
              onClick={() => setActiveTab("validate")}
              className={`py-4 px-6 border-x border-t border-primary-900 rounded-t-lg ${
                activeTab === "validate"
                  ? "bg-primary-700 text-white"
                  : "bg-primary-200 text-primary-900"
              }`}
            >
              <div className="text-left font-lg font-medium">Validate</div>
              <div className="text-xs">Validate other's contribution</div>
            </button>
          </div>

          <div className="bg-primary-200 p-6 border border-primary-900 shadow-sm h-full">
            {activeTab === "speak" && (
              <div className="flex flex-col items-center justify-around space-y-2 h-full">
                <div className="flex items-center justify-between w-full">
                  <div className="text-lg font-medium text-black">
                    {currentData.heading}
                  </div>
                  <div className="flex items-center p-2 border border-neutral-950 bg-primary-100 rounded-sm shadow-sm">
                    <MdOutlineSpeakerGroup
                      size={15}
                      className="text-primary-900"
                    />
                    <span className="text-primary-900 text-xs">
                      Test Speaker
                    </span>
                  </div>
                </div>
                {currentTab === "Speak" && <SpeakComponent />}
                {currentTab === "Listen" && <ListenComponent />}
                {currentTab === "Write" && <WriteComponent />}
                {currentTab === "OCR" && <OcrComponent />}
              </div>
            )}

            {activeTab === "validate" && (
              <div className="flex flex-col items-center justify-around space-y-2 h-full">
                <div className="flex items-center justify-between w-full">
                  <div className="text-lg font-medium text-black">
                    {currentData.heading}
                  </div>
                </div>
                {currentTab === "Speak" && <ValidateAudio />}
                {currentTab === "Listen" && <ValidateListen />}
                {currentTab === "OCR" && <ValidateOcr />}
                {currentTab === "Write" && <ValidateSegmentText />}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}