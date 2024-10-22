import { useState } from "react";
import TabContent from "./TabContent";
import { useFadeInOnScroll } from "~/Hooks/useFadeInOnScroll";

export default function Tabs() {
  const fadeInRef = useFadeInOnScroll()
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Speak", "Listen", "Write", "OCR"];
  const tabContents = [
    "Speak",
    "Listen",
    "Write",
    "OCR",
  ];

  return (
    <div
      ref={fadeInRef}
      className="w-fit mx-auto m-10 py-4 border border-primary-700 rounded-lg opacity-0 transition-opacity duration-2000 ease-in-out"
    >
      <h1 className="font-semibold text-xl text-primary-800 mb-4 px-10">
        Start Participating
      </h1>
      <div className="flex space-x-1 pb-4 px-8 border-b border-neutral-800">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm uppercase rounded-md font-medium transition-bg duration-200 ease-in ${
              activeTab === index
                ? "text-white bg-primary-700"
                : "text-primary-700 hover:bg-primary-100"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <TabContent activeTab={tabContents[activeTab]} />
    </div>
  );
}
