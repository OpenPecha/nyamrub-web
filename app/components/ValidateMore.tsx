import { Link } from "@remix-run/react";
import CurrentStatus from "./CurrentStatus";

interface ValidateMoreProps {
  handleLoadMore: () => void;
}

export default function ValidateMore({
  handleLoadMore,
}: ValidateMoreProps) {
  return (
    <div className="grid grid-cols-6 grid-rows-6 w-full py-4 h-full">
        <div className="row-span-4" />
        <div className="col-span-4 row-span-4 shadow-md rounded-3xl overflow-hidden bg-white place-content-center">
          <div className="flex flex-col items-center justify-center w-full space-y-2">
            <div className="text-lg font-medium text-center">
              Thank you for Validating to Monlam Nyamrup!
            </div>
            <div className="text-center">
              Continue Validation or Checkout your ranking
              <Link to={"/leaderboard"} className="text-blue-700 underline cursor-pointer px-2">here་</Link>
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
        <div className="row-span-4">
          <CurrentStatus totalNumbers={0} />
        </div>
        <div className="col-span-full" />
        <div className="col-span-full">
          <div className="justify-self-end" />
        </div>
      </div>
  );
}
