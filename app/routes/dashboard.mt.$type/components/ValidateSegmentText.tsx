import { FaArrowRightLong } from "react-icons/fa6";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn from "~/components/Buttons";
import ProgressBar from "~/components/ProgressBar";
import ValidateMore from "~/components/ValidateMore";

interface WriteValidation {
  validation_id: string;
  source: string;
  target: string;
}

interface LoaderData {
  data: WriteValidation[];
  user_id: string;
}
export default function ValidateSegment() {
  const { data: write_validation = [], user_id } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  
  const totalValidation = write_validation.length;
  const currentValidation = write_validation[0];
  const isCompleted = totalValidation === 0;

  const handleSkip = () => {
    if (!currentValidation) return;

    const formData = new FormData();
    formData.append("type", "mt");
    formData.append("validation_id", currentValidation.validation_id);

    fetcher.submit(formData, {
      method: "DELETE",
      action: "/api/delete-validation",
    });
  };

  const handleSubmit = (is_valid: boolean) => {
    if (!currentValidation) return;

    const formData = new FormData();
    formData.append("type", "mt");
    formData.append("validation_id", currentValidation.validation_id);
    formData.append("is_valid", String(is_valid));

    fetcher.submit(formData, { method: "PUT", action: "/api/validate" });
  };

  const handleLoadMore = () => {
    const formData = new FormData();
    formData.append("type", "mt");
    formData.append("user_id", user_id);

    fetcher.submit(formData, {
      method: "POST",
      action: "/api/assign-contribution",
    });
  };

  if (isCompleted) {
    return (
      <ValidateMore handleLoadMore={handleLoadMore} />
    )
  }
  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-full shadow-md rounded-lg  border bg-primary-100 space-y-4 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex-1" />
          <div className="translation_language_label flex flex-row items-center">
            <div className="flex items-center justify-center border rounded-sm px-4 py-1 border-neutral-800 text-xs">
              English
            </div>
            <FaArrowRightLong className="text-neutral-900 mx-4 my-2" />
            <div className="flex items-center justify-center border rounded-sm px-4 border-neutral-800 text-md">
              བོད་ཡིག་
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <button
              className="text-primary-900 text-sm font-medium underline cursor-pointer  px-4"
              onClick={handleSkip}
            >
              མཆོང་།
            </button>
          </div>
        </div>
        <div className="translation_input flex flex-row items-center w-full h-full ">
          <div className="text-sm p-3 ml-10 bg-white flex-1 w-full h-4/5  rounded-l-lg resize-none overflow-hidden border-r border-neutral-900">
            <p className="text-primary-900">English</p>
            <textarea
              className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
              placeholder="There is no source segment available now"
              value={currentValidation?.source}
              readOnly={true}
            ></textarea>
          </div>
          <div className="text-sm p-3 mr-10 bg-white flex-1 w-full h-4/5  rounded-r-lg resize-none overflow-hidden">
            <p className="text-primary-900">བོད་ཡིག་</p>
            <textarea
              className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
              placeholder="Type something..."
              value={currentValidation?.target}
              readOnly={true}
            />
          </div>
        </div>
        <div className="translation_button flex flex-row items-center justify-center my-5 space-x-6">
          <ActionBtn
            text="Incorrect"
            style="bg-primary-700 text-xs font-medium text-white"
            handleClick={() => handleSubmit(false)}
          />
          <ActionBtn
            text="Correct"
            style="bg-primary-700 text-xs font-medium text-white"
            handleClick={() => handleSubmit(true)}
          />
        </div>
      </div>
      <ProgressBar total={totalValidation} />
    </div>
  );
}
