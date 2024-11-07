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

export default function ListenComponent() {
  const loaderData = useLoaderData();
  const [translatedText, settranslatedText] = useState("");
  const [listenContributions, setListenContributions] = useState(
    loaderData?.data || []
  );
  const revalidator = useRevalidator();
  console.log("loaderData ::::", loaderData);
  // const { user_id } = loaderData;
  const user_id = "2332423";

  const [count, setcount] = useState(
    () =>
      listenContributions
        .map((item) => item.text)
        .filter((text) => text != null).length
  );

  const contribData = listenContributions.map((item) => item.source_audio_url);
  console.log("dat :", listenContributions);
  const handleCancel = () => {
    settranslatedText("");
  };

  const totalContribution = listenContributions.length;

  const handleSubmit = async () => {
    setcount((count) => count + 1);
    const contribution_id = listenContributions[count].id;
    const res = await contributeListen(contribution_id, translatedText);
    settranslatedText("");
  };

  const handleSkip = async () => {
    setcount((count) => count + 1);
    const contribution_id = listenContributions[count].id;
    const res = await deleteContribution(contribution_id);
  };

  const onPrepareSTTContribution = async () => {
    revalidator.revalidate();
    try {
      const res = await prepareSTTContribution(user_id);
      if (res.status == "success") {
        const newContributeData = await showListenContributor(user_id);
        setListenContributions(newContributeData.data || []);
        console.log("res ::::: ", newContributeData);
        setcount(0);
      } else {
        alert("No data to contribute. Please try again later");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // setListenContributions(loaderData?.contribution || []);
    setcount(
      () =>
        listenContributions
          .map((item) => item.text)
          .filter((text) => text != null).length
    );
  }, [loaderData]);
  console.log("conte", count);
  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      {count < totalContribution ? (
        <>
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
            <AudioPlayer tempAudioURL={contribData[count]} />
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
          <div className="flex items-center justify-center w-3/5 space-x-2">
            <div className="w-full bg-white rounded-full h-2.5">
              <div
                className="bg-primary-900 h-2.5 rounded-full"
                style={{ width: `${((count + 1) / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium">
              {count + 1}/{totalContribution}
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-around w-4/5 h-48 bg-primary-100 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full">
            <div className="text-sm font-medium text-center">
              {totalContribution === 0
                ? "Thank you for your contribution."
                : `You have validated  ${totalContribution}  OCR contributed data
              language !`}
              <button
                onClick={onPrepareSTTContribution}
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
      )}
    </div>
  );
}
