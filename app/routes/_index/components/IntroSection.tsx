import { IoIosBook } from "react-icons/io";
import { MdHeadphones, MdInsertPhoto } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";

const IntroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh] border md:min-h-screen py-20 md:py-10 bg-primary-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-2xl max-sm:text-lg font-monlam font-semibold mb-2">
          ཁྱེད་ཀྱིས་ཞབས་འདེགས་ཅི་ཞིག་སྒྲུབ་ཐུབ་བམ།
        </h1>
        <h1 className="text-3xl max-sm:text-2xl font-bold text-gray-900 mb-4">
          How can you contribute?
        </h1>

        <p className="text-gray-600 sm:leading-relaxed sm:text-xl leading-8 font-monlam font-medium mb-4 max-sm:mb-2">
          འདི་ནི་ཀློག་འདོན་ཉན་གསུམ་དང་། ཡིག་འབེབས།
          འབྲི་རྩོམ་བཅས་ཀྱི་བྱེད་སྒོ་བརྒྱུད་བོད་ཀྱི་སྐད་ཡིག་ཉར་ཚགས་གོང་འཕེལ་ལ་དམིགས་པའི་མཉམ་རུབ་ཀྱི་སྡིངས་ཆ་ཞིག་ཡིན།
        </p>
        <p className="text-lg max-sm:text-base text-gray-600  mb-8 max-sm:mb-6">
          The Collaborative Platform to Preserve and Promote the Tibetan
          Language Contribute by Image Translating, Reading, Listening, and
          Writing.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {FEATURE_ICONS.map(({ Icon, label }) => (
            <FeatureIcon key={label} Icon={Icon} label={label} />
          ))}
        </div>
      </div>
    </section>
  );
};


const FEATURE_ICONS = [
  { Icon: MdInsertPhoto, label: "Image Translation" },
  { Icon: MdHeadphones, label: "Listening" },
  { Icon: FaPenNib, label: "Writing" },
  { Icon: IoIosBook, label: "Reading" },
] as const;

const FeatureIcon = ({
  Icon,
  label,
}: {
  Icon: (typeof FEATURE_ICONS)[number]["Icon"];
  label: string;
}) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-10 md:w-16 h-10 md:h-16 rounded-full bg-secondary-600 flex items-center justify-center transition-transform hover:scale-110">
      <Icon className="text-white w-5 md:w-8 h-5 md:h-8" aria-hidden="true" />
    </div>
    <span className="sr-only">{label}</span>
  </div>
);

export default IntroSection;
