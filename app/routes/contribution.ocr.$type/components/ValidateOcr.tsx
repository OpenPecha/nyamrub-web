import { useFetcher, useLoaderData } from "@remix-run/react";
import { Correctbtn, Incorrectbtn, Skipbtn } from "~/components/Buttons";
import CurrentStatus from "~/components/CurrentStatus";
import Progressbar from "~/components/Progressbar";
import ValidateMore from "~/components/ValidateMore";

interface WriteValidation {
  validation_id: string;
  source_img_url: string;
  text: string;
}

interface LoaderData {
  data: WriteValidation[];
  currentUser: any;
}
export default function ValidateOcr() {
  const { data: Ocr_validations = [], currentUser:user } = useLoaderData<LoaderData>();
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
     formData.append("user_id", user?.user_id);

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
      <div className="row-span-4 hidden md:block" />
      <div className="col-span-6 md:col-span-4 row-span-5 bg-white shadow-md rounded-lg overflow-hidden mx-4">
        <div className="flex flex-col justify-around items-center h-full py-5 px-4 bg-white shadow-md rounded-lg relative">
                    <Progressbar totalNumbers={totalValidation} />
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 text-lg font-semibold font-monlam text-center text-primary-900">
              པར་ཡིག་ཇི་བཞིན་ཡིག་འབེབས་བྱོས།
            </div>
          </div>
          <div className="w-full h-fit overflow-x-auto">
            <img
              src={currentValidation?.source_img_url}
              className="h-20 w-full object-contain rounded-lg"
              alt="manuscript"
            />
          </div>

          <textarea
            className="bg-neutral-50 rounded-lg resize-none text-neutral-950 font-monlam text-lg font-medium leading-loose focus:outline-none focus:ring-0 border placeholder:text-neutral-700 placeholder:text-xs placeholder:font-medium py-6 px-4 w-full placeholder:font-monlam"
            placeholder="འདིར་ཡི་གེ་འབྲི།"
            rows={5}
            value={currentValidation?.text}
            readOnly={true}
          />
        </div>
      </div>
      <div className="row-span-5 place-content-center hidden md:block">
        <CurrentStatus totalNumbers={totalValidation} />
      </div>
      <div className="col-span-full">
        <div className="flex flex-row items-center justify-center h-full space-x-2 md:space-x-6">
          <Skipbtn handleClick={handleSkip} />
          <Incorrectbtn handleClick={() => handleSubmit(false)} />
          <Correctbtn handleClick={() => handleSubmit(true)} />
        </div>
      </div>
    </div>
  );
}
