import { Link } from "@remix-run/react";
import { IoIosBook } from "react-icons/io";
import { MdHeadphones } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";

export default function Badge() {
    const cards = [
        { icon: <FaPenNib size={15} className="text-primary-900"/>, title: "Write",total:0 },
        { icon: <MdInsertPhoto size={15} className="text-primary-900"/>, title: "OCR",total:0 },
    { icon: <IoIosBook size={20} className="text-primary-900"/>, title: "Speak",total:0 },
    { icon: <MdHeadphones size={20} className="text-primary-900"/>, title: "Listen",total:0 },
    ]
    const contributions = [
        
    ]
  return (
    <div className="flex flex-col justify-between col-span-5">
      <div className="bg-white border border-neutral-950 rounded-lg text-center py-4 mb-2">
        <h2 className="text-sm font-semibold text-primary-900 mb-2">
          Earn Digital Badges For Contributing
        </h2>
        <div className="flex justify-center gap-2">
          <div className="w-12 h-12 bg-primary-300"></div>
          <div className="w-12 h-12 bg-primary-300"></div>
          <div className="w-12 h-12 bg-primary-300"></div>
          <div className="w-12 h-12 bg-primary-300"></div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="flex flex-col items-center  justify-between bg-primary-200 rounded-lg p-2 text-center border border-primary-600 w-full h-full "
          >
            <div className="flex flex-col justify-between space-y-2 w-full">
              <div className="flex items-center justify-between">
                {card.icon}
                <div className="font-semibold text-left text-xs">
                  Start Contributing
                </div>
              </div>
              <span className="text-sm font-medium text-left bg-white px-1 rounded-md w-fit">
                {card.title}
              </span>
            </div>
            <div className="w-full">
              <div className="text-sm font-semibold text-left text-primary-950">
                {card.total}
              </div>
              <div className="text-sm font-semibold text-left text-primary-950">
                Total Contribution
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
