import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionBtn, { Correctbtn, Incorrectbtn, Skipbtn } from "~/components/Buttons";
import CurrentStatus from "~/components/CurrentStatus";
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
  console.log("Ocr_validations", Ocr_validations);
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
    <div className="grid grid-cols-6 grid-rows-6 w-full py-4 h-full">
      <div className="row-span-4" />
      <div className="col-span-4 row-span-4 bg-white shadow-md rounded-3xl overflow-hidden">
        <div className="flex flex-col justify-around items-center h-full py-5">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 text-sm font-monlam text-center text-primary-900">
              པར་ཡིག་ཇི་བཞིན་ཡིག་འབེབ་བྱོས།
            </div>
          </div>
          <div className="w-11/12 h-fit overflow-x-auto">
            <img
              src={currentValidation?.source_img_url}
              className="h-20 w-full object-contain rounded-lg"
              alt="manuscript"
            />
          </div>

          <textarea
            className="bg-neutral-100 border rounded-lg text-xs resize-none focus:outline-none focus:ring-0 placeholder:text-neutral-700 placeholder:text-xs placeholder:font-medium p-4 w-3/5 text-neutral-900"
            // placeholder="Start typing here..."
            placeholder="འདིར་ཡི་གེ་འབྲི།"
            rows={5}
            value={currentValidation?.text}
            readOnly={true}
          />
        </div>
      </div>
      <div className="row-span-4">
        <CurrentStatus totalNumbers={totalValidation} />
      </div>
      <div className="col-span-full">
        <div className="flex flex-row items-center justify-center h-full space-x-6">
          <Incorrectbtn handleClick={() => handleSubmit(false)} />
          <Correctbtn handleClick={() => handleSubmit(true)} />
        </div>
      </div>
      <div className="col-span-full">
        <div className="flex items-start justify-end h-full">
          <Skipbtn handleClick={handleSkip} />
        </div>
      </div>
    </div>
  );
}
