
const CurrentStatus = ({ totalNumbers }: { totalNumbers: number }) => {
    const currentNumber = 6-totalNumbers
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((number) => (
        <div
          key={number}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            ${
              currentNumber === number
                ? "bg-primary-400 text-neutral-950 font-medium"
                : "bg-primary-100 text-neutral-400"
            }
            transition-colors duration-300
          `}
        >
          {number}
        </div>
      ))}
    </div>
  );
};

export default CurrentStatus;
