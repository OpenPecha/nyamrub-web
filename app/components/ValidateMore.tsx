import { Link, useLoaderData } from "@remix-run/react";
import CurrentStatus from "./CurrentStatus";
import LoginPopup from "./LoginPopup";
import { useState } from "react";

interface ValidateMoreProps {
  handleLoadMore: () => void;
}

export default function ValidateMore({
  handleLoadMore,
}: ValidateMoreProps) {

  const [isModalOpen, setModalOpen] = useState(false);
  const { currentUser } = useLoaderData();
  return (
    <div className="grid grid-cols-6 grid-rows-6 w-full py-4 h-full">
      <div className="row-span-4 hidden md:block" />
      <div className="col-span-6 md:col-span-4 row-span-6 md:row-span-4 shadow-md rounded-3xl overflow-hidden bg-white place-content-center mx-4 md:mx-0">
        <div className="flex flex-col items-center justify-center w-full space-y-2">
          <div className="text-lg font-normal text-center">
            <span className="block text-lg font-monlam font-medium">
              ཞུ་དག་གནང་བར་ཐུགས་རྗེ་ཆེ།
            </span>
            Thank you for Validating to Monlam Nyamrup!
          </div>
          <div className="text-center">
            <span className="block text-md font-monlam">
              མུ་མཐུད་ཞུ་དག་བྱ། ཡང་ན་འདི་ནས་ཁྱེད་ཀྱི་སྐར་གྲངས་མཐོང་ཐུབ།
            </span>
            Continue Validation or Checkout your ranking
            {!currentUser?.is_guest ? (
              <Link
                to={"/leaderboard"}
                className="text-blue-700 underline cursor-pointer px-2"
              >
                here་
              </Link>
            ) : (
              <span className="text-blue-700 underline cursor-pointer px-2" onClick={() => setModalOpen(true)}>
                here
              </span>
            )}
            <LoginPopup isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
          </div>
          <button
            onClick={handleLoadMore}
            className="mx-auto my-10 flex items-center p-2 py-4 border border-neutral-700 bg-primary-100 rounded-md shadow-sm"
            type="button"
          >
            <span className="text-primary-900 text-xs font-monlam">
              བརྟག་དཔྱད་མང་བ་གནང་
            </span>
          </button>
        </div>
      </div>
      <div className="row-span-4 place-content-center hidden md:block">
        <CurrentStatus totalNumbers={0} />
      </div>
      <div className="col-span-full" />
      <div className="col-span-full">
        <div className="justify-self-end" />
      </div>
    </div>
  );
}
