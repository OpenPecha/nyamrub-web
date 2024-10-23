import React, { useState } from 'react'
import AudioPlayer from '../AudioPlayer';
import ActionBtn from '../utils/Buttons';

export default function ListenComponent() {
  const [count, setcount] = useState(0);
  const handleCancel = () => {
  }
  const handleSubmit = () => {
  }
  const demoAudioUrl =
    "https://monlam-test.s3.ap-south-1.amazonaws.com/BashaDan/speak/1729680378097-recording.mp3";
    const sampleText = [
      "སློབ་སྦྱོང་ཡར་རྒྱས་གཏོང་བའི་ཆེད་དུ་བྱེད་སྒོ་སྤེལ་བ་རེད།",
      "hi how are you",
      "སློབ་སྦྱོང་ཡར་རྒྱས་གཏོང་བའི་ཆེད་དུ་བྱེད་སྒོ་སྤེལ་བ་རེད།",
      "where are you",
      "how are you doing",
    ];
  return (
    <div className="flex flex-col items-center justify-around w-4/5 h-4/5 bg-primary-100 rounded-lg shadow-md">
      <div className="flex items-center justify-center w-full">
        <div className="flex-1 text-2xl text-center">{sampleText[count]}</div>
        <button
          disabled={count === 5}
          className="text-primary-900 text-sm font-medium underline cursor-pointer mr-6"
          // onClick={resetRecord}
        >
          Skip
        </button>
      </div>
      <AudioPlayer tempAudioURL={demoAudioUrl} />
      <div>
        <textarea />
      </div>
      <div className="flex items-center justify-center space-x-2">
        <ActionBtn
          text="Cancel"
          // isDisabled={isListening || !listened}
          style="bg-primary-700 text-xs font-medium text-white"
          handleClick={handleCancel}
        />
        <ActionBtn
          text="Submit"
          // isDisabled={isListening || !listened}
          style="bg-primary-700 text-xs font-medium text-white"
          handleClick={handleSubmit}
        />
      </div>
    </div>
  );
}
