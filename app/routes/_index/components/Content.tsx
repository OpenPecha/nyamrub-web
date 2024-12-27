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
    heading:'ཚིག་རེ་རེས་སྐད་ཡིག་དབར་གྱི་སྟོང་ཆ་བསྐོངས།',
    tibDescription: `
དབྱིན་ཡིག་ནས་བོད་ཡིག་ཏུ་ཡིག་སྒྱུར་བྱས་ཏེ་སྐད་ཡིག་གཉིས་ཀྱི་ཡིག་ཆའི་ཐོན་སྐྱེད་ཕོན་ཆེ་རུ་གཏོང་རོགས། ཁྱེད་ཀྱི་ཞབས་ཞུ་འདིས་སློབ་གཉེར་བ་དང་། ཞིབ་འཇུག་པ། བོད་ཡིག་གཙོ་བོར་སྤྱོད་པའི་སྡེ་ཁག་ལ་དོ་སྙིང་ལྡན་ལ་སྤུས་ཚད་ཅན་གྱི་ཡིག་སྒྱུར་མཁོ་སྤྲོད་བྱེད་ཐུབ།`,
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
    title: "ཀློག",
    heading:"ཁྱེད་ཀྱི་འབོད་སྒྲ་བརྒྱུད་ནས་སློབ་གཉེར་ཀྱི་ཕྱོགས་ལ་ལེགས་སྐྱེས་འབུལ།",
    tibDescription: `

བོད་ཡིག་ནང་ཡོད་པའི་ཡིག་ཆ་རྣམས་སྐད་ཤུགས་མཐོན་པོས་ཀློག་འདོན་གྱིས་སྒྲ་འཇུག་བྱས་ཏེ། བོད་སྐད་ཀྱི་སྒྲ་གདངས་མ་ལག་བཟོ་སྐྲུན་དང་སྒྲ་ལྡན་གྱི་སློབ་གཉེར་གྱི་རྒྱུ་ཆ་ཇེ་ཕྱུག་ཏུ་གཏོང་ཐུབ། སྒྲ་འཇུག་དེ་དག་ནི་སློབ་གཉེར་བ་དང་སྐད་ཡིག་གི་མ་ལག་ལ་དགོས་མཁོ་ཆེ་ལ། བོད་སྐད་ཀྱི་རྒྱུ་ཆ་ཕུན་སུམ་ཚོགས་པ་དང་སྤུས་ཚད་ཅན་དུ་གཏོང་རྒྱུར་རབ་འདེགས་བྱེད་ཐུབ།`,
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
    heading:"ཉོན། ཡིག་འབེབས་བྱོས། སྣ་མང་ཕུན་སུམ་ཚོགས་པའི་སྐད་ཡིག་ཉར་ཚགས་བྱོས།",
    tibDescription: `

བོད་ཀྱི་ཡུལ་སྐད་འདྲ་མིན་གྱི་སྒྲ་འཇུག་ལ་ཉན་ནས་སྒྲ་འབེབས་བྱ་རོགས། ཁྱེད་རང་ལས་གཞིའི་འདིའི་ནང་མཉམ་ཞུགས་གནང་བ་དེས། གནད་ཆེ་བའི་ཡུལ་སྐད་ཞིབ་འཇུག་ཀྱི་གཞི་གྲངས་བསྐྲུན་ཐུབ་པ་མ་ཟད། སྒྲ་འཛིན་རིག་ནུས་ཡར་རྒྱས་གཏོང་ཐུབ།`,
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
    heading:"བརྗོད་པ་རེ་རེས་རིག་གཞུང་གཅེས་འཛིན་བྱེད།",
    tibDescription: `

མཉེན་ཆས་སྟེང་དུ་འཆར་བའི་བོད་ཀྱི་གསུང་རབ་རྣམས་ཡི་གེའི་རྣམ་པར་ཕབ་འབྲི་བྱ་རོགས། འདིས་རྩ་ཆེ་བའི་བཀའ་བསྟན་བཅོས་རྣམས་གློག་ཀླད་ནང་ཉར་ཚགས་ཐུབ་པ་མ་ཟད། སློབ་གསོ་དང་རིག་གཞུང་གི་ཐད་ནས་བོད་ཀྱི་རྩོམ་རིགས་ཀྱི་རྒྱུ་ཆ་མང་ཉུང་དང་སྤུད་ཚད་ཀྱི་ཕྱོགས་ལ་ཞབས་འདེགས་ཞུ་ཐུབ། ཁྱེད་ཀྱི་འབད་རྩོལ་ལ་བརྟེན་ནས་འབྱུང་འགྱུར་མི་རབས་རྣམས་ལ་བོད་ཀྱི་ཕུན་སུམ་ཚོགས་པའི་སྐད་ཡིག་་དང་རིག་གཞུང་བརྒྱུད་སྤྲོད་བྱེད་ཐུབ།`,
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
