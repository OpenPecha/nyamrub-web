import { useState, useCallback } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn, { Skipbtn } from "~/components/Buttons";
import ContributeMore from "~/components/ContributeMore";
import CurrentStatus from "~/components/CurrentStatus";

interface MtContribution {
  id: string;
  img_url: string;
  text: string;
}

interface LoaderData {
  data: MtContribution[];
  user_id: string;
}
export default function WriteComponent() {
  const { data: write_contributions = [], user_id } =
    useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  const [translatedText, settranslatedText] = useState("");

  const currentText = write_contributions[0]?.source;
  const totalContribution = write_contributions.length;
  const isCompleted = totalContribution === 0;

  const handleCancel = () => {
    settranslatedText("");
  };

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
    formData.append("user_id", user_id);
    fetcher.submit(formData, { method: "post", action: "/api/assign-data" });
  }, [fetcher, user_id]);

  if (isCompleted) {
    return <ContributeMore handleLoadMore={handleLoadMore} />;
  }

  return (
    <>
      <div className="grid grid-cols-8 grid-rows-6 py-4 w-full h-full">
        <div className="row-span-4" />
        <div className="col-span-6 row-span-4 shadow-md rounded-3xl">
          <div className="flex flex-row items-center h-full shadow-md rounded-3xl">
            <div className="text-sm p-10 space-y-4 bg-neutral-50 flex-1 w-full h-full   rounded-l-3xl  resize-none overflow-hidden">
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
            <div className="text-sm p-10 space-y-4 bg-white flex-1 w-full h-full  rounded-r-3xl resize-none overflow-hidden">
              <p className="text-primary-900 font-monlam font-semibold text-lg h-8">བོད་ཡིག་</p>
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
        <div className="row-span-4 place-content-center">
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
