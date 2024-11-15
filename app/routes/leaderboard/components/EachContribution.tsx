import { Link } from "@remix-run/react";
import { IoIosBook } from "react-icons/io";
import { MdHeadphones } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";

export default function EachContribution() {
  const cards = [
    {
      icon: FaPenNib,
      title: "སྒྱུར།",
      total: 10,
      description: "ཚིག་གྲུབ་བསྒྱུར་ཟིན་པའི་གྲངས།",
      path: "/contribution/mt/contribute",
    },
    {
      icon: MdInsertPhoto,
      title: "བྲིས།",
      total: 234,
      description: "པར་ཡིག་ཕབ་ཟིན་པའི་གྲངས།",
      path: "/contribution/ocr/contribute",
    },
    {
      icon: IoIosBook,
      title: "ཀློགས།",
      total: 12,
      description: "ཚིག་རིས་བཀླགས་ཟིན་པའི་གྲངས།",
      path: "/contribution/tts/contribute",
    },
    {
      icon: MdHeadphones,
      title: "ཉོན།",
      total: 0,
      description: "སྒྲ་ཡིག་འབེབ་ཟིན་པའི་གྲངས།",
      path: "/contribution/stt/contribute",
    },
  ];
    return (
      <>
        {cards.map((card, index) => (
            
      <div className="col-span-2 bg-white shadow-md inset-0 rounded-xl overflow-hidden px-2">
          <div
            key={card.title}
            className="flex flex-col items-center justify-around rounded-xl p-2 text-center w-full h-full "
          >
            <div className="flex items-center justify-start space-x-1 w-full">
              <card.icon size={25} className="text-primary-600" />
              <span className="text-lg font-medium text-left bg-white p-2 rounded-md w-fit">
                {card.title}
              </span>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="text-2xl font-medium">{card.total}</div>
                        <Link to={card.path} className="text-primary-900">
                            <FaAngleRight size={25} className="text-neutral-950" />
                        </Link>
                    </div>
            <div className="w-full">
              <div className="text-md font-medium text-left text-primary-950">
                {card.description}
              </div>
            </div>
          </div>
            </div>
        ))}
        </>
  );
}
