import { useState } from "react";
import { MdOutlineSpeakerGroup } from "react-icons/md";

export default function SpeakComponent() {
  const [activeTab, setActiveTab] = useState("speak");
  const sampleText = [
    "སློབ་སྦྱོང་ཡར་རྒྱས་གཏོང་བའི་ཆེད་དུ་བྱེད་སྒོ་སྤེལ་བ་རེད།",
    "hi how are you"
  ];
  return (
    <div className="flex flex-col items-center w-full h-full bg-primary-100 rounded-lg shadow-md">
      <div className="flex flex-col items-center justify-around h-full">
        <div className="text-2xl text-center">
          སློབ་སྦྱོང་ཡར་རྒྱས་གཏོང་བའི་ཆེད་དུ་བྱེད་སྒོ་སྤེལ་བ་རེད།
        </div>
        <div>audio </div>
        <div>buttons</div>
      </div>
    </div>
  );
}
