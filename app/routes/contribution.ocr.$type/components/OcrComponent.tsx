import { useCallback, useState } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn, { Skipbtn } from "~/components/Buttons";
import ContributeMore from "~/components/ContributeMore";
import CurrentStatus from "~/components/CurrentStatus";

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
    <>
      <div className="grid grid-cols-6 grid-rows-6 w-full py-4 h-full">
        <div className="row-span-4" />
        <div className="col-span-4 row-span-4 bg-white shadow-md rounded-3xl overflow-hidden">
          <div className="flex flex-col justify-around items-center h-full py-5 bg-white shadow-md rounded-3xl">
            <div className="flex items-center justify-center w-full">
              <div className="flex-1 text-sm font-monlam text-center text-primary-900">
                པར་ཡིག་ཇི་བཞིན་ཡིག་འབེབ་བྱོས།
              </div>
            </div>
            <div className="w-11/12 h-fit overflow-x-auto">
              <img
                src={currentImgUrl}
                className="h-20 w-full object-contain rounded-lg"
                alt="manuscript"
              />
            </div>

            <textarea
              className="bg-neutral-50 border rounded-lg text-sm font-monlam resize-none focus:outline-none focus:ring-0 placeholder:text-neutral-700 placeholder:text-sm placeholder:font-medium p-4 w-4/5 text-neutral-950"
              // placeholder="Start typing here..."
              placeholder="འདིར་ཡི་གེ་འབྲི།"
              rows={5}
              value={translatedText}
              onChange={(e) => settranslatedText(e.target.value)}
            />
          </div>
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
            <Skipbtn handleClick={handleSkip} />
          </div>
        </div>
      </div>
    </>
  );
}
