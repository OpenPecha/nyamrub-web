import { useCallback, useState } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn, { Skipbtn } from "~/components/Buttons";
import ContributeMore from "~/components/ContributeMore";
import CurrentStatus from "~/components/CurrentStatus";
import AudioPlayer from "~/components/AudioPlayer";
import Progressbar from "~/components/Progressbar";

interface ListenContribution {
  id: string;
  source_audio_url: string;
  text: string;
}

interface LoaderData {
  data: ListenContribution[];
  currentUser: string;
}

export default function ListenComponent() {
  const { data: listen_contributions = [], currentUser : user } =
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
    formData.append("user_id", user?.user_id);
    fetcher.submit(formData, { method: "post", action: "/api/assign-data" });
  }, [fetcher, user?.user_id]);

  if (isCompleted) {
    return <ContributeMore handleLoadMore={handleLoadMore} />;
  }
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-8 py-4 w-full h-full">
        <div className="row-span-6 hidden md:block" />
        <div className="col-span-6 md:col-span-4 row-span-7 bg-white shadow-md rounded-lg overflow-hidden mx-4">
          <div className="flex flex-col justify-around items-center h-full py-5 px-2 bg-white shadow-md rounded-lg relative">
            <Progressbar totalNumbers={totalContribution} />
            <div className="flex items-center justify-center w-full">
              <div className="flex-1 text-lg font-semibold text-center text-primary-900 font-monlam">
                {/* Type the text as you hear the audio */}
                སྒྲ་ཇི་བཞིན་ཡིག་འབེབས་བྱོས།
              </div>
            </div>
            <AudioPlayer tempAudioURL={currentAudioUrl} />
            <textarea
              className="bg-neutral-50 rounded-lg resize-none text-neutral-950 font-monlam text-lg font-medium leading-loose focus:outline-none focus:ring-0 border placeholder:text-neutral-700 placeholder:text-lg placeholder:font-medium py-6 px-4 w-full md:w-3/4  placeholder:font-monlam"
              placeholder="འདིར་ཡི་གེ་འབྲི།"
              rows={5}
              value={translatedText}
              onChange={(e) => settranslatedText(e.target.value)}
            />
          </div>
        </div>
        <div className="row-span-7 place-content-center hidden md:block">
          <CurrentStatus totalNumbers={totalContribution} />
        </div>
        <div className="col-span-full">
          <div className="flex items-center justify-center h-full space-x-2">
            
              <Skipbtn handleClick={handleSkip} />
            <ActionBtn
              text="འགྲིག"
              isDisabled={translatedText.trim() === ""}
              style="border border-neutral-900 text-sm font-monlam font-semibold text-primary-900"
              handleClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
