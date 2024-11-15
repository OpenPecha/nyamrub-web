interface MtComponentProps {
  currentText: string;
  translatedText: string;
  settranslatedText: (text: string) => void;
}

export default function MtComponent({ currentText, translatedText, settranslatedText }: MtComponentProps) {
    return (
      <div className="flex flex-row items-center h-full">
        <div className="text-sm p-10 bg-neutral-50 flex-1 w-full h-full   rounded-l-lg  resize-none overflow-hidden">
          <p className="text-primary-900">English</p>
          <textarea
            className="bg-neutral-50 w-full h-full p-2 text-lg resize-none overflow-hidden focus:border-transparent focus:outline-none"
            placeholder="There is no source segment available now"
            value={currentText}
            readOnly={true}
          ></textarea>
        </div>
        <div className="text-sm p-10 bg-white flex-1 w-full h-full  rounded-r-lg resize-none overflow-hidden">
          <p className="text-primary-900">བོད་ཡིག་</p>
          <textarea
            className="bg-white w-full h-full p-2 text-lg resize-none overflow-hidden focus:border-transparent focus:outline-none"
            // placeholder="Type something..."
            placeholder="འདིར་ཡི་གེ་འབྲི།"
            value={translatedText}
            onInput={(e) => settranslatedText(e.target.value)}
          />
        </div>
      </div>
    );
}
