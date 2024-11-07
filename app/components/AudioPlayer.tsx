import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";

interface AudioPlayerProps {
  tempAudioURL: string;
}

const AudioPlayer = ({ tempAudioURL }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

 const handleLoadedMetadata = () => {
   if (audioRef.current && audioRef.current.duration !== Infinity) {
     setDuration(audioRef.current.duration);
   } else {
     setDuration(0); 
   }
 };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [tempAudioURL]);
  
  return (
    <div className="bg-white rounded-full p-2 shadow-sm flex items-center gap-2 max-w-md">
      <button
        onClick={togglePlay}
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
      >
        {isPlaying ? (
          <FaPause className="w-4 h-4" />
        ) : (
          <FaPlay className="w-4 h-4" />
        )}
      </button>

      <div className="text-xs text-gray-500">
        {formatTime(currentTime)}/{formatTime(duration)}
      </div>

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleSliderChange}
        className="flex-grow h-1 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
      />

      <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">
        <HiSpeakerWave className="w-4 h-4" />
      </button>

      <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">
        {/* <MoreVertical className="w-4 h-4" /> */}
      </button>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        src={tempAudioURL}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;
