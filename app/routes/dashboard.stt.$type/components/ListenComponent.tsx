import { useCallback, useState } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
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
  const fetcher = useFetcher();
  
  const [translatedText, settranslatedText] = useState("");

  // Derived values
  const totalContribution = listen_contributions.length;
  const currentAudioUrl = listen_contributions[0]?.source_audio_url;
  const isCompleted = totalContribution === 0;

  const handleCancel = () => {
    settranslatedText("");
  };

  const handleSubmit = useCallback(async () => {
    const formData = new FormData();
    formData.append("type", "stt");
    formData.append("contribution_id", listen_contributions[0].id);
    formData.append("contribution_data", translatedText);
    fetcher.submit(formData, {
      method: "post",
      action: "/api/contribute",
    });
    settranslatedText("");
  }, [fetcher, listen_contributions, translatedText]);

   const handleSkip = useCallback(() => {
     const contribution_id = listen_contributions[0]?.id;
     if (!contribution_id) return;
     const formData = new FormData();
     formData.append("type", "stt");
     formData.append("contribution_id", contribution_id);
     fetcher.submit(formData, {
       method: "delete",
       action: "/api/delete-contribution",
     });
   }, [fetcher, listen_contributions]);

  const handleLoadMore = useCallback(() => {
    const formData = new FormData();
    formData.append("type", "stt");
    formData.append("user_id", user_id);
    fetcher.submit(formData, { method: "post", action: "/api/assign-data" });
  }, [fetcher, user_id]);

  if (isCompleted) {
    return <ContributeMore handleLoadMore={handleLoadMore} />;
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
                disabled={0 === 5}
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
          <ProgressBar total={totalContribution} /> 
    </div>
  );
}
