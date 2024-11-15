import { useCallback, useState } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import AudioPlayer from "~/components/AudioPlayer";
import ActionBtn from "~/components/Buttons";
import ProgressBar from "~/components/ProgressBar";
import ContributeMore from "~/components/ContributeMore";
import CurrentStatus from "~/components/CurrentStatus";
import { form } from "framer-motion/client";
import SttComponent from "~/components/SttComponent";

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
    <>
      <div className="grid grid-cols-6 grid-rows-6 py-4 w-full h-full">
        <div className="row-span-4" />
        <div className="col-span-4 row-span-4 bg-white shadow-md rounded-3xl overflow-hidden">
          <SttComponent
            currentAudioUrl={currentAudioUrl}
            translatedText={translatedText}
            settranslatedText={settranslatedText}
          />
        </div>
        <div className="row-span-4">
          <CurrentStatus totalNumbers={totalContribution} />
        </div>
        <div className="col-span-full">
          <div className="flex items-center justify-center h-full">
            <ActionBtn
              text="འགྲིག"
              isDisabled={translatedText.trim() === ""}
              style="border border-neutral-900 text-sm font-monlam font-semibold text-primary-900"
              handleClick={handleSubmit}
            />
          </div>
        </div>
        <div className="col-span-full">
          <div className="flex items-start justify-end h-full">
            <ActionBtn
              text="མཆོང་།"
              style="justify-self-end bg-primary-700 text-sm font-monlam font-medium text-white mr-10"
              handleClick={handleSkip}
            />
          </div>
        </div>
      </div>
    </>
  );
}
