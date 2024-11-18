
import { FaMedal } from "react-icons/fa";
const OverallProgress = ({ level = 3, progress = 65, points = 20132 }) => {
  return (
    <div className="p-4 my-auto">
      <div className="flex items-center gap-2 mb-2">
        <FaMedal className="text-primary-800 h-6 w-6" />
        <h2 className="text-xl font-semibold">Overall Progress</h2>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Level {level}</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>

        <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-primary-800 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-600">
          {points.toLocaleString()} points earned
        </p>
      </div>
    </div>
  );
};

export default OverallProgress;
