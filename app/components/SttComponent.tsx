import AudioPlayer from "./AudioPlayer";

interface SttComponentProps {
  currentAudioUrl: string;
  translatedText: string;
  settranslatedText: (text: string) => void;
}

export default function SttComponent({ currentAudioUrl, translatedText, settranslatedText }: SttComponentProps) {
    return (
      <div className="flex flex-col justify-around items-center h-full py-5 bg-white shadow-md rounded-3xl">
        <div className="flex items-center justify-center w-full">
          <div className="flex-1 text-md font-medium text-center text-primary-900 font-monlam">
            {/* Type the text as you hear the audio */}
            སྒྲ་ཇི་བཞིན་ཡིག་འབེབ་བྱོས།
          </div>
        </div>
        <AudioPlayer tempAudioURL={currentAudioUrl} />
        <textarea
          className="bg-neutral-100 rounded-lg text-xs resize-none focus:outline-none focus:ring-0 border placeholder:text-neutral-700 placeholder:text-xs placeholder:font-medium p-4 w-3/4 text-neutral-900 font-monlam placeholder:font-monlam"
          // placeholder="Start typing here..."
          placeholder="འདིར་ཡི་གེ་འབྲི།"
          rows={5}
          value={translatedText}
          onChange={(e) => settranslatedText(e.target.value)}
        />
      </div>
    );
}
