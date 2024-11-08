import { useEffect, useState } from "react";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import {
  contributeListen,
  deleteContribution,
  prepareSTTContribution,
  showListenContributor,
} from "../utils/api";
import AudioPlayer from "~/components/AudioPlayer";
import ActionBtn from "~/components/Buttons";
import ProgressBar from "~/components/ProgressBar";
import ContributeMore from "~/components/ContributeMore";

interface ListenContribution {
  id: string;
  source_audio_url: string;
  text: string;
}

interface LoaderData {
  data: ListenContribution[];
  user_id: string;
}

export default function ListenComponent() {
  const { data: listen_contributions = [], user_id } =
    useLoaderData<LoaderData>();
  console.log("listen_contributions ::::: ", listen_contributions);
  const [translatedText, settranslatedText] = useState("");
  const [count, setcount] = useState(
    () =>
      listen_contributions.map((item) => item.text).filter((text) => text != "")
        .length
  );

  // Derived values
  const totalContribution = listen_contributions.length;
  const currentAudioUrl = listen_contributions[count]?.source_audio_url;
  const isCompleted = count >= totalContribution;

  const handleCancel = () => {
    settranslatedText("");
  };

  const handleSubmit = async () => {
    setcount((count) => count + 1);
    const contribution_id = listen_contributions[count].id;
    const res = await contributeListen(contribution_id, translatedText);
    settranslatedText("");
  };

  const handleSkip = async () => {
    setcount((count) => count + 1);
    const contribution_id = listen_contributions[count].id;
    const res = await deleteContribution(contribution_id);
  };

  const onPrepareSTTContribution = async () => {
    try {
      const res = await prepareSTTContribution(user_id);
      if (res.status == "success") {
        const newContributeData = await showListenContributor(user_id);
        console.log("res ::::: ", newContributeData);
        setcount(0);
      } else {
        alert("No data to contribute. Please try again later");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isCompleted) {
    return <ContributeMore handleLoadMore={onPrepareSTTContribution} />;
  }
  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
          <div className="flex flex-col items-center justify-around w-4/5 h-60 py-4 space-y-4 bg-primary-100 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-full">
              <div className="flex-1 text-md font-medium text-center text-primary-900">
                {/* Type the text as you hear the audio */}
                སྒྲ་ཇི་བཞིན་ཡིག་འབེབ་བྱོས།
              </div>
              <button
                disabled={count === 5}
                className="text-primary-900 text-sm font-medium underline cursor-pointer mr-6"
                onClick={handleSkip}
              >
                {/* Skip */}
                མཆོང་།
              </button>
            </div>
            <AudioPlayer tempAudioURL={currentAudioUrl} />
            <textarea
              className="bg-white rounded-lg text-xs resize-none focus:outline-none focus:ring-0 border-0 placeholder:text-neutral-700 placeholder:text-xs placeholder:font-medium p-4 w-3/4 text-neutral-900"
              // placeholder="Start typing here..."
              placeholder="འདིར་ཡི་གེ་འབྲི།"
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
          <ProgressBar completed={count+1} total={totalContribution} /> 
    </div>
  );
}
