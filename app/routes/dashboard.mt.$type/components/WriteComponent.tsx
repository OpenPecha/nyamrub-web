import { FaArrowRightLong } from "react-icons/fa6";
import { useState, useCallback } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn from "~/components/Buttons";
import ProgressBar from "~/components/ProgressBar";
import ContributeMore from "~/components/ContributeMore";
import { Pagination } from "flowbite-react";
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
      <div className="grid grid-cols-6 grid-rows-6 py-4 w-full h-full">
        <div className="row-span-4" />
        <div className="col-span-4 row-span-4 shadow-md rounded-3xl">
          <div className="flex flex-row items-center h-full ">
            <div className="text-sm p-10 bg-neutral-50 flex-1 w-full h-full   rounded-l-lg  resize-none overflow-hidden">
              <p className="text-primary-900">English</p>
              <textarea
                className="bg-white w-full h-full p-2 text-lg resize-none overflow-hidden focus:border-transparent focus:outline-none"
                placeholder="There is no source segment available now"
                value={currentText}
                readOnly={true}
              ></textarea>
            </div>
            <div className="text-sm p-10 bg-white flex-1 w-full h-full  rounded-r-lg resize-none overflow-hidden">
              <p className="text-primary-900">བོད་ཡིག་</p>
              <textarea
                className="bg-white w-full h-full p-2 text-lg resize-none overflow-hidden focus:border-transparent focus:outline-none"
                // placeholder="Type something..."
                placeholder="འདིར་ཡི་གེ་འབྲི།"
                value={translatedText}
                onInput={(e) => settranslatedText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row-span-4">
          <CurrentStatus totalNumbers={totalContribution} />
        </div>
        <div className="col-span-full">
          <div className="flex items-center justify-center h-full">
            <ActionBtn
              text="Submit"
              isDisabled={translatedText.trim() === ""}
              style="border border-neutral-900 text-xs font-medium text-primary-900"
              handleClick={handleSubmit}
            />
          </div>
        </div>
        <div className="col-span-full">
          <div className="flex items-start justify-end h-full">
            <ActionBtn
              text="Skip"
              style="justify-self-end bg-primary-700 text-xs font-medium text-white mr-10"
              handleClick={handleSkip}
            />
          </div>
        </div>
      </div>
    </>
  );
}
