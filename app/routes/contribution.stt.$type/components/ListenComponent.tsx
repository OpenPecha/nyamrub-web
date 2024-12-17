import { useCallback, useState } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn, { Skipbtn } from "~/components/Buttons";
import ContributeMore from "~/components/ContributeMore";
import CurrentStatus from "~/components/CurrentStatus";
import AudioPlayer from "~/components/AudioPlayer";

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
      <div className="grid grid-cols-6 grid-rows-8 py-4 w-full h-full">
        <div className="row-span-6" />
        <div className="col-span-4 row-span-6 bg-white shadow-md rounded-3xl overflow-hidden">
          <div className="flex flex-col justify-around items-center h-full py-5 bg-white shadow-md rounded-3xl">
            <div className="flex items-center justify-center w-full">
              <div className="flex-1 text-lg font-semibold text-center text-primary-900 font-monlam">
                {/* Type the text as you hear the audio */}
                སྒྲ་ཇི་བཞིན་ཡིག་འབེབ་བྱོས།
              </div>
            </div>
            <AudioPlayer tempAudioURL={currentAudioUrl} />
            <textarea
              className="bg-neutral-50 rounded-lg resize-none text-neutral-950 font-monlam text-lg font-medium leading-loose focus:outline-none focus:ring-0 border placeholder:text-neutral-700 placeholder:text-lg placeholder:font-medium py-6 px-4 w-3/4  placeholder:font-monlam"
              placeholder="འདིར་ཡི་གེ་འབྲི།"
              rows={4}
              value={translatedText}
              onChange={(e) => settranslatedText(e.target.value)}
            />
          </div>
        </div>
        <div className="row-span-6 place-content-center">
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
            <Skipbtn handleClick={handleSkip} />
          </div>
        </div>
      </div>
    </>
  );
}
