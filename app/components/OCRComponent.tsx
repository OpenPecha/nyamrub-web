
interface OcrComponentProps {
  currentImgUrl: string;
  translatedText: string;
  settranslatedText: (text: string) => void;
}

export default function OCRComponent({currentImgUrl, translatedText, settranslatedText}: OcrComponentProps) {
    return (
      <div className="flex flex-col justify-around items-center h-full py-5 bg-white shadow-md rounded-3xl">
        <div className="flex items-center justify-center w-full">
          <div className="flex-1 text-md font-medium text-center text-primary-900">
            {/* Type the text from the image */}
            པར་ཡིག་ཇི་བཞིན་ཡིག་འབེབ་བྱོས།
          </div>
        </div>
        <div className="w-11/12 h-fit overflow-x-auto">
          <img
            src={currentImgUrl}
            className="h-20 w-full object-contain rounded-lg"
            alt="manuscript"
          />
        </div>

        <textarea
          className="bg-neutral-300 border rounded-lg text-xs resize-none focus:outline-none focus:ring-0 placeholder:text-neutral-700 placeholder:text-xs placeholder:font-medium p-4 w-3/5 text-neutral-900"
          // placeholder="Start typing here..."
          placeholder="འདིར་ཡི་གེ་འབྲི།"
          rows={5}
          value={translatedText}
          onChange={(e) => settranslatedText(e.target.value)}
        />
      </div>
    );
}
