import ActionBtn from "~/components/Buttons";
import AudioPlayer from "../../../components/AudioPlayer";
import StaticAudioPlayer from "~/components/StaticAudioPlayer";

interface SttComponentProps {
  currentAudioUrl: string;
  translatedText: string;
  settranslatedText: (text: string) => void;
}

export default function SttComponent({
  currentAudioUrl,
  translatedText,
  settranslatedText,
}: SttComponentProps) {
  return (
    <div className="flex flex-col justify-around items-center h-fit space-y-4  py-4 bg-primary-50 shadow-md rounded-xl">
      <div className="flex items-center justify-center w-full">
        <div className=" text-md font-medium text-center text-primary-900 font-monlam">
          {/* Type the text as you hear the audio */}
          སྒྲ་ཇི་བཞིན་ཡིག་འབེབ་བྱོས།
        </div>
      </div>
      <StaticAudioPlayer />
      <textarea
        className="bg-white rounded-sm text-xs resize-none focus:outline-none focus:ring-0 placeholder:text-neutral-950 placeholder:text-xs placeholder:font-medium p-4 w-10/12 text-neutral-950 font-monlam placeholder:font-monlam"
        // placeholder="Start typing here..."
        placeholder="འདིར་ཡི་གེ་འབྲི།"
        rows={3}
        value={translatedText}
        onChange={(e) => settranslatedText(e.target.value)}
      />
      <div className=" flex flex-row items-center justify-center space-x-2">
        <button
          className={`py-2 px-4 w-20 rounded-md text-xs font-monlam font-medium bg-primary-700 text-white `}
        >
          མཆོང་།
        </button>
        <button
          className={`py-2 px-4 w-20 rounded-md text-xs border border-neutral-950 font-monlam font-medium text-primary-900 `}
        >
          འགྲིག
        </button>
      </div>
    </div>
  );
}
