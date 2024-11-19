import { FaPlay } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoMdMore } from "react-icons/io";
const StaticAudioPlayer = () => {
  return (
    <div className="flex items-center gap-x-1 w-4/6 bg-white p-3 rounded-full">
      {/* Play button */}
      <button className="flex items-center justify-center">
        <FaPlay className="w-3 h-3" />
      </button>

      {/* Time display */}
      <span className="text-xs font-medium mx-1">0:00/0:12</span>

      {/* Progress bar */}
      <div className="relative flex-grow h-0.5 bg-neutral-950 rounded-full">
        <div className="absolute left-0 h-full w-0 bg-gray-600 rounded-full"></div>
      </div>
      {/* Volume button */}
      <button className="flex items-center justify-center">
        <HiSpeakerWave className="w-4 h-4" />
      </button>

      {/* Menu button */}
      <button className="flex items-center justify-center">
        <IoMdMore className="w-4 h-4" />
        
      </button>
    </div>
  );
};

export default StaticAudioPlayer;
