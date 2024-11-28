
const CurrentStatus = ({ totalNumbers }: { totalNumbers: number }) => {
    const currentNumber = 6-totalNumbers
  return (
    <div className="flex flex-col items-center space-y-4">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((number) => (
        <div
          key={number}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            ${
              currentNumber === number
                ? "bg-secondary-200 text-white font-medium"
                : "bg-secondary-50 text-primary-600"
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
