import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn from "~/components/Buttons";
import ProgressBar from "~/components/ProgressBar";
import ValidateMore from "~/components/ValidateMore";

interface WriteValidation {
  validation_id: string;
  source_img_url: string;
  text: string;
}

interface LoaderData {
  data: WriteValidation[];
  user_id: string;
}
export default function ValidateOcr() {
  const { data: Ocr_validations = [], user_id } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  
  const totalValidation = Ocr_validations?.length;
  const currentValidation = Ocr_validations[0];
  const isCompleted = totalValidation === 0;

   const handleSkip = () => {
     if (!currentValidation) return;

     const formData = new FormData();
     formData.append("type", "ocr");
     formData.append("validation_id", currentValidation.validation_id);

     fetcher.submit(formData, {
       method: "DELETE",
       action: "/api/delete-validation",
     });
   };

   const handleSubmit = (is_valid: boolean) => {
     if (!currentValidation) return;

     const formData = new FormData();
     formData.append("type", "ocr");
     formData.append("validation_id", currentValidation.validation_id);
     formData.append("is_valid", String(is_valid));

     fetcher.submit(formData, { method: "PUT", action: "/api/validate" });
   };

   const handleLoadMore = () => {
     const formData = new FormData();
     formData.append("type", "ocr");
     formData.append("user_id", user_id);

     fetcher.submit(formData, {
       method: "POST",
       action: "/api/assign-contribution",
     });
  };
  
  if (isCompleted) {
    return (
      <ValidateMore handleLoadMore={handleLoadMore} />
    );
  }
  return (
    <div className="flex flex-col items-center space-y-2 w-full h-full">
      <div className="flex flex-col items-center justify-around w-4/5 h-3/5 py-4 space-y-4 bg-primary-100 rounded-lg shadow-md">
        <div className="flex items-center justify-center w-full">
          <div className="flex-1 text-md font-medium text-center text-primary-900">
            Type the text from the image
          </div>
          <button
            className="text-primary-900 text-sm font-medium underline cursor-pointer mr-6"
            onClick={handleSkip}
          >
            Skip
          </button>
        </div>
        <div className="w-3/5 h-1/5 overflow-x-auto">
          <img
            src={currentValidation?.source_img_url}
            className="h-20 w-full object-cover"
            alt="manuscript"
          />
        </div>

        <div className="bg-white px-4 py-2 text-left w-3/5 h-1/4">
          <div className="text-neutral-500 text-xs">Captured Text</div>
          <p className="text-neutral-800 text-sm">{currentValidation?.text}</p>
        </div>
        <div className="flex items-center justify-center space-x-2">
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
