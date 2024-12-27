import { useState, useCallback } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn, { Skipbtn } from "~/components/Buttons";
import ContributeMore from "~/components/ContributeMore";
import CurrentStatus from "~/components/CurrentStatus";
import Progressbar from "~/components/Progressbar";

interface MtContribution {
  id: string;
  img_url: string;
  text: string;
}

interface LoaderData {
  data: MtContribution[];
  currentUser: any;
}
export default function WriteComponent() {
  const { data: write_contributions = [], currentUser: user } =
    useLoaderData<LoaderData>();

  const fetcher = useFetcher();
  const [translatedText, settranslatedText] = useState("");

  const currentText = write_contributions[0]?.source;
  const totalContribution = write_contributions.length;
  const isCompleted = totalContribution === 0;

  const handleSubmit = useCallback(async () => {
    const formData = new FormData();
    formData.append("type", "mt");
    formData.append("contribution_id", write_contributions[0].id);
    formData.append("contribution_data", translatedText);
    fetcher.submit(formData, {
      method: "post",
      action: "/api/contribute",
    });
    settranslatedText("");
  }, [fetcher, write_contributions, translatedText]);

  const handleSkip = useCallback(() => {
    const contribution_id = write_contributions[0]?.id;
    if (!contribution_id) return;
    const formData = new FormData();
    formData.append("type", "mt");
    formData.append("contribution_id", contribution_id);
    fetcher.submit(formData, {
      method: "delete",
      action: "/api/delete-contribution",
    });
  }, [fetcher, write_contributions]);

  const handleLoadMore = useCallback(() => {
    const formData = new FormData();
    formData.append("type", "mt");
    formData.append("user_id", user?.user_id);
    fetcher.submit(formData, { method: "post", action: "/api/assign-data" });
  }, [fetcher, user?.user_id]);

  if (isCompleted) {
    return <ContributeMore handleLoadMore={handleLoadMore} />;
  }

  return (
    <>
      <div className="grid grid-cols-8 grid-rows-6 py-4 w-full h-full">
        <div className="row-span-4 hidden md:block"></div>
        <div className="col-span-8 md:col-span-6 row-span-5 px-4 md:p-0 shadow-md rounded-lg place-content-center">
          <div className="flex flex-col md:flex-row items-center h-full rounded-lg">
            <div className="text-sm p-4 md:p-10 space-y-2 bg-neutral-50 flex-1 w-full h-full rounded-t-xl  md:rounded-l-lg  resize-none overflow-hidden relative">
              <Progressbar totalNumbers={totalContribution} />

              <p className="text-primary-900 font-poppins text-xl font-semibold h-8">
                English
              </p>
              <div className="border-b border-neutral-300 w-full"></div>
              <textarea
                className="bg-neutral-50 w-full h-full p-2 text-xl resize-none overflow-hidden focus:border-transparent focus:outline-none"
                placeholder="There is no source segment available now"
                value={currentText}
                readOnly={true}
              ></textarea>
            </div>
            <div className="text-sm p-4 md:p-10 space-y-2 md:space-y-4 bg-white flex-1 w-full h-full  rounded-b-xl md:rounded-r-lg resize-none overflow-hidden">
              <p className="text-primary-900 font-monlam font-semibold text-lg h-8">
                བོད་ཡིག
              </p>
              <div className="border-b border-neutral-300 w-full"></div>
              <textarea
                className="bg-white w-full h-full p-2 text-lg font-monlam font-medium resize-none overflow-auto focus:border-transparent focus:outline-none leading-loose"
                placeholder="འདིར་ཡི་གེ་འབྲི།"
                value={translatedText}
                onInput={(e) => settranslatedText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row-span-5 place-content-center hidden md:block">
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
