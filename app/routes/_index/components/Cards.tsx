import { useFadeInOnScroll } from "~/Hooks/useFadeInOnScroll";
import { ParticipateBtn } from "./Buttons";

const cards = [
  {
    icon: "✒️",
    title: "Translate / སྒྱུར་",
    subtitle: "Translate the text back to your language",
    action: "translate",
  },
  {
    icon: "📖",
    title: "Read / ཀློགས།",
    subtitle: "Record the text That you see on the screen",
    action: "read",
  },
  {
    icon: "🎧",
    title: "Listen / ཉན་",
    subtitle: "Write the text from what you hear",
    action: "listen",
  },
  {
    icon: "🖼️",
    title: "OCR / འབྲི་",
    subtitle: "Write the text That you see from the image",
    action: "ocr",
  },
];

interface CardProps {
  icon: string;
  title: string;
  subtitle: string;
  action: string;
}

const Card = ({ icon, title, subtitle, action }: CardProps) => (
  <div className="border border-primary-700 rounded-xl p-6 flex flex-col items-center text-center space-y-4 hover:bg-primary-50">
    <div className="bg-primary-600 rounded-full p-3">
      <span className="text-2xl">{icon}</span>
    </div>
    <h2 className="text-xl font-bold">{title}</h2>
    <p className="text-sm text-gray-600">{subtitle}</p>
    <div className="flex-grow"></div> {/* Spacer element */}
    <div className="self-stretch flex justify-center">
      <ParticipateBtn />
    </div>
  </div>
);

const CardList = () => {
  const fadeInRef = useFadeInOnScroll();

  return (
    <div ref={fadeInRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10 pt-20 opacity-0 transition-opacity duration-1000 ease-in-out ">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default CardList;
