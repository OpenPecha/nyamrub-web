import React, { useEffect, useState } from 'react'
import AudioPlayer from '../AudioPlayer';
import ActionBtn from '../utils/Buttons';
import { useLoaderData } from "@remix-run/react";
import { contributeListen, deleteContribution } from "./utils/contributeListen";


export default function ListenComponent() {
  const [translatedText, settranslatedText] = useState("")
  const loaderData = useLoaderData();
  const listen_contributions = loaderData?.contribution || []
  const totalContribution = listen_contributions.length
  console.log("listen : ", listen_contributions)
  const [count, setcount] = useState(
    () =>
      listen_contributions.map((item) => item.text).filter((text) => text != "").length
  );
  const contribData = listen_contributions.map((item) => item.source_audio_url)
  const handleCancel = () => {
    settranslatedText("")
  }
 
  console.log("count : ", count , totalContribution)


  const handleSubmit = async () => {
    setcount(count=>count+1)
    const contribution_id = listen_contributions[count].id;
    const res = await contributeListen(contribution_id,  translatedText);
    console.log("response from updated data", contribution_id, translatedText)
    settranslatedText("")
  }
  
  const handleSkip = async () => {
    setcount(count=>count+1)
    const contribution_id = listen_contributions[count].id
    const res = await deleteContribution(contribution_id)
    if (res.status === 'success') {
      setcount(count=>count+1)
    }

  }
  // const demoAudioUrls = [
  //   "https://monlam-test.s3.ap-south-1.amazonaws.com/BashaDan/speak/1729680378097-recording.mp3",
  //   "https://monlam-test.s3.ap-south-1.amazonaws.com/BashaDan/speak/1729686205223-recording.mp3",
  //   "https://monlam-test.s3.ap-south-1.amazonaws.com/BashaDan/speak/1729686186780-recording.mp3",
  //   "https://monlam-test.s3.ap-south-1.amazonaws.com/BashaDan/speak/1729686218870-recording.mp3",
  // ];
  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      {count < totalContribution ? (
        <>
          <div className="flex flex-col items-center justify-around w-4/5 h-60 py-4 space-y-4 bg-primary-100 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-full">
              <div className="flex-1 text-md font-medium text-center text-primary-900">
                Type the text as you hear the audio
              </div>
              <button
                disabled={count === 5}
                className="text-primary-900 text-sm font-medium underline cursor-pointer mr-6"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
            <AudioPlayer tempAudioURL={contribData[count]} />
            <textarea
              className="bg-white rounded-lg text-xs resize-none focus:outline-none focus:ring-0 border-0 placeholder:text-neutral-700 placeholder:text-xs placeholder:font-medium p-4 w-3/4 text-neutral-900"
              placeholder="Start typing here..."
              rows={5}
              value={translatedText}
              onChange={(e) => settranslatedText(e.target.value)}
            />
            <div className="flex items-center justify-center space-x-2">
              <ActionBtn
                text="Cancel"
                isDisabled={translatedText.trim() === ""}
                style="bg-primary-700 text-xs font-medium text-white"
                handleClick={handleCancel}
              />
              <ActionBtn
                text="Submit"
                isDisabled={translatedText.trim() === ""}
                style="border border-neutral-900 text-xs font-medium text-primary-900"
                handleClick={handleSubmit}
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-3/5 space-x-2">
            <div className="w-full bg-white rounded-full h-2.5">
              <div
                className="bg-primary-900 h-2.5 rounded-full"
                style={{ width: `${((count + 1) / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium">{count + 1}/{totalContribution}</span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-around w-4/5 h-48 bg-primary-100 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 text-sm font-medium text-center">
              You contributed {totalContribution} sentence(s) for your language!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
