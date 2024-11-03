export default function Stat() {
  const demoData = {
    language: 1,
    participants: 1000,
    recordedDuration: "12hr 20min",
    validatedDuration: "10hr 10min",
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-around m-10 bg-primary-700 rounded-lg p-4 text-white ">
      <div className=" text-center p-2">
        <p className="text-lg font-bold">Contributions made to</p>
        <p className="text-lg">SPEAK</p>
      </div>
      <div className=" text-center p-2 px-8 border-t md:border-l md:border-t-0 border-white">
        <p className="text-lg font-bold">{demoData.language}</p>
        <p className="text-sm">language</p>
      </div>
      <div className=" text-center p-2 border-t md:border-l md:border-t-0 border-white">
        <p className="text-lg font-bold">{demoData.participants}</p>
        <p className="text-sm">People Participated</p>
      </div>
      <div className=" text-center p-2 border-t md:border-l md:border-t-0 border-white">
        <p className="text-lg font-bold">{demoData.recordedDuration}</p>
        <p className="text-sm">Duration Recorded</p>
      </div>
      <div className=" text-center p-2 border-t md:border-l md:border-t-0 border-white">
        <p className="text-lg font-bold">{demoData.validatedDuration}</p>
        <p className="text-sm">Duration Validated</p>
      </div>
    </div>
  );
}
