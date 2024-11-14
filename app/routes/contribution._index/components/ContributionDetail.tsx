import { Link } from "@remix-run/react";
import { IoIosBook } from "react-icons/io";
import { MdHeadphones } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";

export default function ContributionDetail() {
  const cards = [
    {
      icon: <FaPenNib size={15} className="text-primary-900" />,
      title: "སྒྱུར།",
      // title: "Write",
      total: 0,
      contribution: "ཚིག་གྲུབ་བསྒྱུར་ཟིན་པའི་གྲངས།",
    },
    {
      icon: <MdInsertPhoto size={15} className="text-primary-900" />,
      title: "བྲིས།",
      total: 0,
      contribution: "པར་ཡིག་ཕབ་ཟིན་པའི་གྲངས།",
    },
    {
      icon: <IoIosBook size={20} className="text-primary-900" />,
      title: "ཀློགས།",
      total: 0,
      contribution: "ཚིག་རིས་བཀླགས་ཟིན་པའི་གྲངས།",
    },
    {
      icon: <MdHeadphones size={20} className="text-primary-900" />,
      title: "ཉོན།",
      total: 0,
      contribution: "སྒྲ་ཡིག་འབེབ་ཟིན་པའི་གྲངས།",
    },
  ];
  const contributions = [];
  return (
    <div className="flex flex-col justify-between col-span-12 md:col-span-5">
      <div className="bg-white border border-neutral-950 rounded-lg text-center py-4 mb-2">
        <h2 className="text-lg font-semibold text-primary-900 mb-2">
          ཚིག་གྲུབ་མང་དུ་སྤེལ་ན་གསོག་སྐར་མང་པོ་འཐོབ།
          {/* Earn Digital Badges For Contributing */}
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
            className="flex flex-col items-center justify-between bg-primary-200 rounded-lg p-2 text-center border border-primary-600 w-full h-full "
          >
            <div className="flex flex-col justify-between space-y-2 w-full">
              <div className="flex items-center justify-between">
                {card.icon}
                <div className="font-semibold text-left text-md">
                  འགོ་འཛུགས།
                </div>
              </div>
              <span className="text-sm font-medium text-left bg-white p-2 rounded-md w-fit">
                {card.title}
              </span>
            </div>
            <div className="w-full">
              <div className="text-sm font-semibold text-left text-primary-950">
                {card.total}
              </div>
              <div className="text-sm font-semibold text-left text-primary-950">
                {card.contribution}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
