import { FaArrowRightLong } from "react-icons/fa6";
import { useState, useEffect, useSyncExternalStore, useCallback } from "react";
import { useFetcher, useLoaderData, useRevalidator } from "@remix-run/react";
import contributeText from "../utils/contributeText";
import deleteContribution from "../utils/deleteContribution";
import { prepareMTContribution } from "../utils/prepareData";
import ActionBtn from "~/components/Buttons";
import ProgressBar from "~/components/ProgressBar";
import ContributeMore from "~/components/ContributeMore";

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
  console.log(write_contributions);
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
    <div className="flex flex-col justify-center w-full h-full bg-primary-100 rounded-lg shadow-md">
      <div className="translation_language_label flex flex-row justify-center items-center mt-4">
        <div className=" flex items-center justify-center border rounded-sm px-4 py-1 border-neutral-800 text-xs">
          English
        </div>
        <FaArrowRightLong className="text-neutral-900 mx-4 my-2" />
        <div className="flex items-center justify-center border rounded-sm px-4 border-neutral-800 text-md">
          བོད་ཡིག་
        </div>
      </div>
      <button
        className="text-right text-primary-900 text-sm font-medium underline cursor-pointer mr-6"
        onClick={handleSkip}
      >
        {/* Skip */}
        མཆོང་།
      </button>
      <div className="translation_input flex flex-row items-center w-full h-full ">
        <div className="text-sm p-3 ml-10 bg-white flex-1 w-full h-full  rounded-l-lg border-r border-neutral-900 resize-none overflow-hidden">
          <p className="text-primary-900">English</p>
          <textarea
            className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
            placeholder="There is no source segment available now"
            value={currentText}
            readOnly={true}
          ></textarea>
        </div>
        <div className="text-sm p-3 mr-10 bg-white flex-1 w-full h-full  rounded-r-lg resize-none overflow-hidden">
          {/* <p className="text-primary-900">Tibetan</p> */}
          <p className="text-primary-900">བོད་ཡིག་</p>
          <textarea
            className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
            // placeholder="Type something..."
            placeholder="འདིར་ཡི་གེ་འབྲི།"
            value={translatedText}
            onInput={(e) => settranslatedText(e.target.value)}
          />
        </div>
      </div>
      <div className="translation_button flex flex-row items-center justify-center my-5 space-x-6">
        <ActionBtn
          text="Cancel"
          isDisabled={translatedText.trim() === ""}
          style="flex items-center justify-center rounded-md bg-primary-700  text-xs text-white py-2 px-6"
          handleClick={handleCancel}
        />
        <ActionBtn
          text="Submit"
          isDisabled={translatedText.trim() === ""}
          style="border border-neutral-900 text-xs font-medium text-primary-900"
          handleClick={handleSubmit}
        />
      </div>
      <ProgressBar total={totalContribution} />
    </div>
  );
}
