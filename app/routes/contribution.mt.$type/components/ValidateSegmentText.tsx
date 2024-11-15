import { FaArrowRightLong } from "react-icons/fa6";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn from "~/components/Buttons";
import ProgressBar from "~/components/ProgressBar";
import ValidateMore from "~/components/ValidateMore";
import CurrentStatus from "~/components/CurrentStatus";

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
    <>
      <div className="grid grid-cols-6 grid-rows-6 w-full py-4 h-full">
        <div className="row-span-4" />
        <div className="col-span-4 row-span-4 shadow-md rounded-3xl overflow-hidden">
          <div className="flex flex-row justify-center h-full">
            <div className="text-sm p-10 bg-neutral-50 flex-1 w-full h-full  rounded-l-lg resize-none overflow-hidden">
              <p className="text-primary-900">English</p>
              <textarea
                className="bg-neutral-50 w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
                placeholder="There is no source segment available now"
                value={currentValidation?.source}
                readOnly={true}
              ></textarea>
            </div>
            <div className="text-sm p-10 bg-white flex-1 w-full h-full  rounded-r-lg resize-none overflow-hidden">
              <p className="text-primary-900">བོད་ཡིག་</p>
              <textarea
                className="bg-white w-full h-full p-2 resize-none overflow-hidden focus:border-transparent focus:outline-none"
                placeholder="Type something..."
                value={currentValidation?.target}
                readOnly={true}
              />
            </div>
          </div>
        </div>
        <div className="row-span-4">
          <CurrentStatus totalNumbers={totalValidation} />
        </div>
        <div className="col-span-full">
          <div className="flex flex-row items-center justify-center h-full space-x-6">
            <ActionBtn
              text="ནོར་"
              style="bg-primary-700 text-sm font-monlam font-medium text-white"
              handleClick={() => handleSubmit(false)}
            />
            <ActionBtn
              text="འགྲིག"
              style="border border-neutral-950 text-sm font-monlam font-medium text-primary-900"
              handleClick={() => handleSubmit(true)}
            />
          </div>
        </div>
        <div className="col-span-full">
          <div className="justify-self-end">
            <div className="flex items-start justify-end h-full">
              <ActionBtn
                text="མཆོང་།"
                style="justify-self-end bg-primary-700 text-sm font-monlam font-medium text-white mr-10"
                handleClick={handleSkip}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
