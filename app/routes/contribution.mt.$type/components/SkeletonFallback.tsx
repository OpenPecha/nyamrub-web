import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonFallback = () => (
  <div className="flex flex-col items-center w-full h-full">
    <div className="grid grid-cols-8 grid-rows-6 py-4 w-full h-full">
      <div className="row-span-4 hidden md:block"></div>
      <div className="col-span-8 md:col-span-6 row-span-5 px-4 md:p-0 shadow-md rounded-lg place-content-center">
        <div className="flex flex-col md:flex-row items-center h-full rounded-lg">
          <div className="text-sm p-4 md:p-10 space-y-2 bg-neutral-50 flex-1 w-full h-full rounded-t-xl md:rounded-l-lg resize-none overflow-hidden relative">
            <Skeleton height={20} width="80%" />
            <Skeleton
              height={30}
              width="40%"
              style={{ marginBottom: "10px" }}
            />
            <Skeleton
              height={1}
              width="100%"
              style={{ marginBottom: "10px" }}
            />
            <Skeleton height={200} width="100%" />
          </div>
          <div className="text-sm p-4 md:p-10 space-y-2 md:space-y-4 bg-white flex-1 w-full h-full rounded-b-xl md:rounded-r-lg resize-none overflow-hidden">
            <Skeleton
              height={30}
              width="40%"
              style={{ marginBottom: "10px" }}
            />
            <Skeleton
              height={1}
              width="100%"
              style={{ marginBottom: "10px" }}
            />
            <Skeleton height={200} width="100%" />
          </div>
        </div>
      </div>
      <div className="row-span-5 place-content-center hidden md:block">
        <Skeleton height={150} width={100} />
      </div>
      <div className="col-span-full">
        <div className="flex items-center justify-center h-full space-x-2">
          <Skeleton height={40} width={80} />
          <Skeleton height={40} width={80} />
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonFallback;
