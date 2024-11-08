interface ValidateMoreProps {
  handleLoadMore: () => void;
}

export default function ValidateMore({
  handleLoadMore,
}: ValidateMoreProps) {
  return (
    <div className="flex flex-col items-center mx-auto justify-around w-4/5 h-48 bg-primary-100 rounded-lg shadow-md">
      <div className="flex items-center justify-center w-full">
        <div className="text-sm font-medium text-center">
          Thank you for your validation!
          <button
            onClick={handleLoadMore}
            className="mx-52 my-5 flex items-center p-2 border border-neutral-950 bg-primary-100 rounded-sm shadow-sm"
            type="button"
          >
            <span className="text-primary-900 text-xs">
              བརྟག་དཔྱད་མང་བ་གནང་
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
