import { Link } from "@remix-run/react";
import { IoIosBook } from "react-icons/io";
import { MdHeadphones } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import ListItem from "./ListItem";
import FeatureList from "./FeatureList";
import { ListeningCard, ReadingCard, SpeakingCard, WritingCard } from "./Cards";

const items = [
  {
    id: "write",
    icon: <FaPenNib size={25} className="text-white" />,
    title: "སྒྱུར།",
    description:
      "ཤེས་བྱ་སྣ་ཚོགས་ནང་འདྲེན་བྱས་ཏེ་སྐད་ཡིག་ཇེ་ཕྱུག་ཏུ་གཏོང་། ཁྱེད་ཀྱིས་གང་མཐོང་བ་དེ་དབྱིན་ཡིག་ནས་བོད་ཡིག་ལ་བསྒྱུར་དགོས།",
    btnText: "ལས་འགོ་འཛུགས།",
    card: WritingCard,
  },
  {
    id: "speak",
    icon: <IoIosBook size={25} className="text-white" />,
    title: "ཀློག།",
    description:
      "ཤེས་བྱ་སྣ་ཚོགས་ནང་འདྲེན་བྱས་ཏེ་སྐད་ཡིག་ཇེ་ཕྱུག་ཏུ་གཏོང་། ཁྱེད་ཀྱིས་གང་མཐོང་བ་དེ་དབྱིན་ཡིག་ནས་བོད་ཡིག་ལ་བསྒྱུར་དགོས།",
    btnText: "ལས་འགོ་འཛུགས།",
    card: SpeakingCard,
  },
  {
    id: "listen",
    icon: <MdHeadphones size={25} className="text-white" />,
    title: "ཉོན།",
    description:
      "ཤེས་བྱ་སྣ་ཚོགས་ནང་འདྲེན་བྱས་ཏེ་སྐད་ཡིག་ཇེ་ཕྱུག་ཏུ་གཏོང་། ཁྱེད་ཀྱིས་གང་མཐོང་བ་དེ་དབྱིན་ཡིག་ནས་བོད་ཡིག་ལ་བསྒྱུར་དགོས།",
    btnText: "ལས་འགོ་འཛུགས།",
    card: ListeningCard,
  },
  {
    id: "read",
    icon: <MdInsertPhoto size={25} className="text-white" />,
    title: "བྲིས།",
    description:
      "ཤེས་བྱ་སྣ་ཚོགས་ནང་འདྲེན་བྱས་ཏེ་སྐད་ཡིག་ཇེ་ཕྱུག་ཏུ་གཏོང་། ཁྱེད་ཀྱིས་གང་མཐོང་བ་དེ་དབྱིན་ཡིག་ནས་བོད་ཡིག་ལ་བསྒྱུར་དགོས།",
    btnText: "ལས་འགོ་འཛུགས།",
    card: ReadingCard,
  },
];
export default function Content() {
  return (
    <div className="flex w-full items-start gap-20">
      {/* Left Side */}
      <div className=" w-full flex flex-col items-center space-y-4">
        <div className="py-[50vh]">
          <ul>
          {items.map((item, index) => (
              <FeatureList id={item.id} key={index}>
              <ListItem item={item} index={index} />
              </FeatureList>
            ))}
        </ul>
        </div>
      </div>

      {/* Right Side - Translation Card */}
      <div className="sticky top-0 h-screen w-4/5 flex items-center justify-center">
        <div className="relative aspect-square bg-primary-200 w-3/4 rounded-2xl flex justify-center items-center">
          {items.map((item, index) => (
            <item.card key={index} id={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
