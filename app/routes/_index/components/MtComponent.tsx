interface MtComponentProps {
  currentText: string;
  translatedText: string;
  settranslatedText: (text: string) => void;
}

export default function MtComponent({ currentText, translatedText, settranslatedText }: MtComponentProps) {
    return (
      <div className="flex flex-row items-center h-4/5 shadow-md rounded-xl">
        <div className="text-sm p-4 bg-neutral-50 flex-1 w-full h-full   rounded-l-xl  resize-none overflow-hidden">
          <p className="text-xs text-primary-900">English</p>
          <textarea
            className="bg-neutral-50 w-full h-full p-2 text-xs resize-none overflow-hidden focus:border-transparent focus:outline-none"
            placeholder="There is no source segment available now"
            value={currentText}
            readOnly={true}
          ></textarea>
        </div>
        <div className="text-xs p-4 bg-white flex-1 w-full h-full  rounded-r-xl resize-none overflow-hidden">
          <p className="text-primary-900 font-monlam text-xs">བོད་ཡིག་</p>
          <textarea
            className="bg-white w-full h-full p-2 text-sm font-monlam resize-none overflow-hidden focus:border-transparent placeholder:text-xs focus:outline-none"
            // placeholder="Type something..."
            placeholder="འདིར་ཡི་གེ་འབྲི།"
            value={translatedText}
            onInput={(e) => settranslatedText(e.target.value)}
          />
        </div>
      </div>
    );
}
