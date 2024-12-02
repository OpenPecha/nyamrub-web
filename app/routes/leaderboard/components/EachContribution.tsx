import { Link, useLoaderData } from "@remix-run/react";
import { IoIosBook } from "react-icons/io";
import { MdHeadphones, MdInsertPhoto } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";

export default function EachContribution() {
  const { contributions } = useLoaderData();
  const cards = [
    {
      icon: FaPenNib,
      title: "སྒྱུར།",
      total: contributions.mt_contribution,
      description: "ཚིག་གྲུབ་བསྒྱུར་ཟིན་པའི་གྲངས།",
      path: "/contribution/mt/contribute",
    },
    {
      icon: MdInsertPhoto,
      title: "བྲིས།",
      total: contributions.ocr_contribution,
      description: "པར་ཡིག་ཕབ་ཟིན་པའི་གྲངས།",
      path: "/contribution/ocr/contribute",
    },
    {
      icon: IoIosBook,
      title: "ཀློགས།",
      total: contributions.tts_contribution,
      description: "ཚིག་རིས་བཀླགས་ཟིན་པའི་གྲངས།",
      path: "/contribution/tts/contribute",
    },
    {
      icon: MdHeadphones,
      title: "ཉོན།",
      total: contributions.stt_contribution,
      description: "སྒྲ་ཡིག་འབེབ་ཟིན་པའི་གྲངས།",
      path: "/contribution/stt/contribute",
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <div
          key={card.title}
          className="col-span-5 md:col-span-2 bg-white shadow-md inset-0 rounded-xl overflow-hidden px-2"
        >
          <div className="flex flex-col items-center justify-around rounded-xl p-2 text-center w-full h-full ">
            <div className="flex items-center justify-start space-x-1 w-full">
              <card.icon size={25} className="text-secondary-500" />
              <span className="text-md font-monlam text-primary-950 text-left bg-white p-2 rounded-md w-fit">
                {card.title}
              </span>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="text-2xl font-medium">{card.total}</div>
              <Link to={card.path} className="text-primary-900">
                <FaAngleRight
                  size={25}
                  className="text-neutral-950 hover:text-primary-900"
                />
              </Link>
            </div>
            <div className="w-full">
              <div className="text-xs font-monlam text-left text-primary-950">
                {card.description}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
