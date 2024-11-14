import { useState, useCallback } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn from "~/components/Buttons";
import ContributeMore from "~/components/ContributeMore";
import CurrentStatus from "~/components/CurrentStatus";
import MtComponent from "~/components/MtComponent";

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
          <MtComponent currentText={currentText} translatedText={translatedText} settranslatedText={settranslatedText} />
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
