import { useState } from "react";
import { Outlet } from "@remix-run/react";

interface RightSectionProps {
  currentTab: string;
}

export default function RightSection({ currentTab }: RightSectionProps) {
  const [activeTab, setActiveTab] = useState("speak");

  const data = {
    Speak: {
      // title: "Speak",
      title: "སྐད་སྒྲ་ཡར་འཇུག་བྱས་ཏེ་བོད་སྐད་རིག་ནུས་ཡར་རྒྱས་གཏོང་།",
      // subTitle: "Enrich your language by donating your voice",
      // tabTitle: "Speak",
      tabTitle: "ཀློག་འདོན།",
      // tabDescription: "Contribute your voice",
      // heading: "Speak / Record",
    },
    Listen: {
      title: "སྒྲ་ཡིག་འབེབ་བྱས་ཏེ་གསུང་རྒྱུན་སྣ་ཚོགས་སྲུང་སྐྱོབ་བྱེད།",
      // subTitle: "Enrich your language by typing the audio that you hear",
      // tabTitle: "Listen",
      tabTitle: "ཡིག་འབེབ།",
      // tabDescription: "Type what you hear",
      // heading: "Listen Tibet / Transcribe",
    },
    Write: {
      // title: "Write",
      title: "ཤེས་བྱ་སྣ་ཚོགས་ནང་འདྲེན་བྱས་ཏེ་སྐད་ཡིག་ཇེ་ཕྱུག་ཏུ་གཏོང་།",
      // subTitle: "Enrich your language by translating text",
      tabTitle: "ཡིག་སྒྱུར།",
      // tabTitle: "Transcribe",
      // tabDescription: "Translate and Type the Text",
      // heading: "WRITE Tibet / Translate",
    },
    OCR: {
      title: "དཔེ་རྙིང་ཡིག་འབེབ་བྱས་ཏེ་ཕ་མེས་ཀྱི་གཅེས་ནོར་རྒྱུན་འཛིན་བྱ།",
      // title: "OCR",
      // subTitle: "Enrich your language by translating text",
      // tabTitle: "Label",
      tabTitle: "ཡིག་འབེབ།",
      // tabDescription: "Type text as per the image",
      // heading: "OCR Tibet / Speaker",
    },
  };

  const currentData = data[currentTab as keyof typeof data] || data.Speak;
  return (
    <div className="flex flex-col items-center w-full h-fit">
      <div className="w-full min-w-3xl">
        <h1 className="text-2xl font-semibold mb-2 text-primary-900 uppercase">
          {currentData.title}
        </h1>
        <p className="mb-6 text-neutral-900 text-sm font-medium">
          {currentData.subTitle}
        </p>

        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("speak")}
            className={`py-1.5 px-4 border-x border-t border-primary-900  rounded-t-lg ${
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
            className={`py-1.5 px-4 border-x border-t border-primary-900 rounded-t-lg ${
              activeTab === "validate"
                ? "bg-primary-700 text-white"
                : "bg-primary-200 text-primary-900"
            }`}
          >
            <div className="text-left font-lg font-medium">ཞུ་དག</div>
            {/* <div className="text-xs">Validate other's contribution</div> */}
          </button>
        </div>

        <div className="bg-primary-200 p-6 border border-primary-900 shadow-sm h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
