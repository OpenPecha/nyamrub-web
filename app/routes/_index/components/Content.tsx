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
    heading: "ཚིག་རེ་རེས་སྐད་ཡིག་བར་གྱི་སྟོང་ཆ་སྐོང་།",
    tibDescription: `དབྱིན་ཡིག་ནས་བོད་ཡིག་ཏུ་ཡིག་བསྒྱུར་བྱས་ཏེ་སྐད་ཡིག་གཉིས་ཀྱི་ཡིག་ཆའི་ཐོན་སྐྱེད་ཕོན་ཆེ་རུ་གཏོང་རོགས། ཁྱེད་ཀྱི་ཞབས་ཞུ་འདིས་སློབ་གཉེར་བ་དང་། ཞིབ་འཇུག་པ། བོད་ཡིག་གཙོ་བོར་སྤྱོད་པའི་སྡེ་ཁག་བཅས་ལ་དོན་སྙིང་ལྡན་ལ་སྤུས་ཚད་ཅན་གྱི་འགྱུར་ཡིག་མཁོ་སྤྲོད་བྱེད་ཐུབ།
`,
    enDescription: `Contribute by Translating
"Bridge the Language Gap, One Word at a Time."
Translate English texts into Tibetan to enhance the availability of bilingual resources. Your work ensures accurate and meaningful translations for learners, researchers, and Tibetan-speaking communities.`,
    btnText: "ལས་འགོ་འཛུགས།",
    card: WritingCard,
    path: "/contribution/mt/contribute",
  },
  {
    id: "speak",
    icon: <IoIosBook size={25} className="text-white" />,
    title: "ཀློགས།",
    heading: "ཁྱེད་ཀྱི་སྐད་སྒྲ་བརྒྱུད་ནས་སློབ་གཉེར་ཕྱོགས་ལ་ལེགས་སྐྱེས་འབུལ།",
    tibDescription: `བོད་ཡིག་ཏུ་ཡོད་པའི་ཡིག་ཆ་རྣམས་སྒྲ་དག་གསལ་གསུམ་ངང་ཀློག་འདོན་གྱིས་སྒྲ་འཇུག་བྱས་ཏེ། བོད་སྐད་ཀྱི་སྒྲ་གདངས་མ་ལག་བཟོ་སྐྲུན་དང་སྒྲ་ལྡན་གྱི་སློབ་གཉེར་རྒྱུ་ཆ་ཇེ་ཕྱུག་ཏུ་གཏོང་ཐུབ། སྒྲ་འཇུག་དེ་དག་ནི་སློབ་གཉེར་བ་དང་སྐད་ཡིག་གི་མ་ལག་ལ་དགོས་མཁོ་ཆེ་ལ། བོད་སྐད་ཀྱི་རྒྱུ་ཆ་ཕུན་སུམ་ཚོགས་པ་དང་སྤུས་ཚད་ཅན་དུ་གཏོང་བར་རམ་འདེགས་བྱེད་ཐུབ།`,
    enDescription: `Contribute by Reading
"Empower Learning Through Your Voice."
Read Tibetan texts aloud and record them to support pronunciation tools and audio learning resources. These recordings are essential for learners and language tools, ensuring accessibility and clarity in spoken Tibetan.`,
    btnText: "ལས་འགོ་འཛུགས།",
    card: SpeakingCard,
    path: "/contribution/tts/contribute",
  },
  {
    id: "listen",
    icon: <MdHeadphones size={25} className="text-white" />,
    title: "ཉོན།",
    heading: "སྒྲ་ཡིག་འབེབས་བྱས་ཏེ་ཕུན་སུམ་ཚོགས་པའི་སྐད་ཡིག་སྣ་མང་ཉར་ཚགས་བྱེད།",
    tibDescription: `
བོད་ཀྱི་ཡུལ་སྐད་འདྲ་མིན་གྱི་སྒྲ་འཇུག་ལ་ཉན་ནས་ཡིག་འབེབས་བྱེད་རོགས། ཁྱེད་རང་ལས་གཞི་འདིའི་ནང་མཉམ་ཞུགས་གནང་བ་དེས། གནད་ཆེ་བའི་ཡུལ་སྐད་ཞིབ་འཇུག་གི་གཞི་གྲངས་བསྐྲུན་ཐུབ་པར་མ་ཟད། སྒྲ་འཛིན་རིག་ནུས་ཡར་རྒྱས་གཏོང་ཐུབ།`,
    enDescription: `Contribute by Listening
"Listen, Transcribe, and Preserve Dialect Diversity."
Listen to audio recordings in various Tibetan dialects and transcribe them into text. Your contributions create a vital database for studying dialectical variations and refining speech-to-text technologies.`,
    btnText: "ལས་འགོ་འཛུགས།",
    card: ListeningCard,
    path: "/contribution/stt/contribute",
  },
  {
    id: "read",
    icon: <MdInsertPhoto size={25} className="text-white" />,
    title: "བྲིས།",
    heading: "བརྗོད་པ་རེ་རེ་ཡིས་ཕ་མེས་ཀྱི་གཅེས་ནོར་རྒྱུན་འཛིན་བྱེད།",
    tibDescription: `
འཆར་ངོས་སུ་ཤར་བའི་བོད་ཀྱི་གསུང་རབ་རྣམས་ཡིག་འབེབས་བྱེད་རོགས། འདིས་རྩ་ཆེ་བའི་བཀའ་བསྟན་རྣམས་གློག་ཀླད་དུ་ཉར་ཚགས་ཀྱིས་འབྱུང་འགྱུར་མི་རབས་རྣམས་ལ་བོད་ཀྱི་ཕུན་སུམ་ཚོགས་པའི་སྐད་ཡིག་དང་རིག་གཞུང་བརྒྱུད་སྤྲོད་བྱེད་ཐུབ།`,
    enDescription: `Contribute by Writing
"Preserve Heritage, One Sentence at a Time."
View Tibetan scriptures displayed on the platform, and contribute by typing them out in written form. This feature not only preserves sacred texts digitally but also improves the accuracy and availability of Tibetan literature for educational and cultural purposes. Your effort ensures that the richness of Tibetan script and heritage is passed on to future generations.`,
    btnText: "ལས་འགོ་འཛུགས།",
    card: ReadingCard,
    path: "/contribution/ocr/contribute",
  },
];
export default function Content() {
  return (
    <div className="flex w-full items-start gap-20">
      {/* Left Side */}
      <div className="flex-1 w-full flex flex-col items-center space-y-4">
        <div className="md:py-[50vh]">
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
      <div className="flex-1 max-md:hidden sticky top-0 h-screen w-full flex items-center justify-center">
        <div className="relative bg-secondary-50 h-5/6 w-5/6 rounded-2xl flex justify-center items-center">
          {items.map((item, index) => (
            <item.card key={index} id={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
