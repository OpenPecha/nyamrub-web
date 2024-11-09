import React, { useCallback, useEffect, useState } from "react";
import { useFetcher, useLoaderData, useRevalidator } from "@remix-run/react";
import {
  updateOCRContribution,
  prepareOCRContribution,
  deleteOCRConrtibution,
  showOCRContributor,
} from "../utils/api";
import ActionBtn from "~/components/Buttons";
import ProgressBar from "~/components/ProgressBar";
import ContributeMore from "~/components/ContributeMore";

interface OcrContribution {
  id: string;
  img_url: string;
  text: string;
}

interface LoaderData {
  data: OcrContribution[];
  user_id: string;
}

export default function OcrComponent() {
  
  const { data: ocr_contributions = [], user_id } =
    useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  const [translatedText, settranslatedText] = useState("");

  const totalContribution = ocr_contributions.length;
  const currentImgUrl = ocr_contributions[0]?.img_url;
  const isCompleted = totalContribution === 0;

  const handleCancel = () => {
    settranslatedText("");
  };
  
  const handleSubmit = useCallback(async () => {
    const formData = new FormData();
    formData.append("type", "ocr");
    formData.append("contribution_id", ocr_contributions[0].id);
    formData.append("contribution_data", translatedText);
    fetcher.submit(formData, {
      method: "post",
      action: "/api/contribute",
    });
    settranslatedText("");
  }, [fetcher, ocr_contributions, translatedText]);

  const handleSkip = useCallback(() => {
    const contribution_id = ocr_contributions[0]?.id;
    if (!contribution_id) return;
    const formData = new FormData();
    formData.append("type", "ocr");
    formData.append("contribution_id", contribution_id);
    fetcher.submit(
      formData,
      { method: "delete", action: "/api/delete-contribution" }
    );
  }, [fetcher, ocr_contributions]);

  const handleLoadMore = useCallback(() => {
    const formData = new FormData();
    formData.append("type", "ocr");
    formData.append("user_id", user_id);
    fetcher.submit(formData, { method: "post", action: "/api/assign-data" });
  }, [fetcher, user_id]);

  if (isCompleted) {
    return <ContributeMore handleLoadMore={handleLoadMore} />;
  }

  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      <div className="flex flex-col items-center justify-around w-4/5 h-3/5 py-4 space-y-4  bg-primary-100 rounded-lg shadow-md">
        <div className="flex items-center justify-center w-full">
          <div className="flex-1 text-md font-medium text-center text-primary-900">
            {/* Type the text from the image */}
            པར་ཡིག་ཇི་བཞིན་ཡིག་འབེབ་བྱོས།
          </div>
          <button
            className="text-primary-900 text-sm font-medium underline cursor-pointer mr-6"
            onClick={handleSkip}
          >
            {/* Skip */}
            མཆོང་།
          </button>
        </div>
        <div className="w-11/12 h-1/5 overflow-x-auto">
          <img
            src={currentImgUrl}
            className="h-20 w-full object-contain rounded-lg"
            alt="manuscript"
          />
        </div>

        <textarea
          className="bg-white rounded-lg text-xs resize-none focus:outline-none focus:ring-0 border-0 placeholder:text-neutral-700 placeholder:text-xs placeholder:font-medium p-4 w-3/5 text-neutral-900"
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
