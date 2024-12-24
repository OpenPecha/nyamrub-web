import { FaArrowRightLong } from "react-icons/fa6";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Correctbtn, Incorrectbtn, Skipbtn } from "~/components/Buttons";
import ValidateMore from "~/components/ValidateMore";
import CurrentStatus from "~/components/CurrentStatus";
import Progressbar from "~/components/Progressbar";

interface WriteValidation {
  validation_id: string;
  source: string;
  target: string;
}

interface LoaderData {
  data: WriteValidation[];
  currentUser: any;
}
export default function ValidateSegment() {
  const { data: write_validation = [], currentUser: user } =
    useLoaderData<LoaderData>();
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
    formData.append("user_id", user?.user_id);

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
      <div className="grid grid-cols-8 grid-rows-6 w-full py-4 h-full">
        <div className="row-span-4  hidden md:block"></div>
        <div className="col-span-8 md:col-span-6 row-span-5 px-4 md:p-0 shadow-md rounded-lg place-content-center">
          <div className="flex flex-col md:flex-row items-center h-full rounded-lg">
            <div className="text-sm p-4 md:p-10 space-y-2 bg-neutral-50 flex-1 w-full h-full rounded-t-xl  md:rounded-l-lg  resize-none overflow-hidden relative">
              <Progressbar totalNumbers={totalValidation} />
              <p className="text-primary-900 font-poppins text-xl font-semibold h-8">
                English
              </p>
              <div className="border-b border-neutral-300 w-full"></div>
              <textarea
                className="bg-neutral-50 w-full h-full p-2 text-xl resize-none overflow-hidden focus:border-transparent focus:outline-none"
                placeholder="There is no source segment available now"
                value={currentValidation?.source}
                readOnly={true}
              ></textarea>
            </div>
            <div className="text-sm p-4 md:p-10 space-y-2 md:space-y-4 bg-white flex-1 w-full h-full  rounded-b-xl md:rounded-r-lg resize-none overflow-hidden">
              <p className="text-primary-900 font-monlam font-semibold text-lg h-8">
                བོད་ཡིག་
              </p>
              <div className="border-b border-neutral-300 w-full"></div>
              <textarea
                className="bg-white w-full h-full p-2 text-lg font-monlam font-medium resize-none overflow-auto focus:border-transparent focus:outline-none leading-loose"
                placeholder="Type something..."
                value={currentValidation?.text}
                readOnly={true}
              />
            </div>
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
    </>
  );
}
