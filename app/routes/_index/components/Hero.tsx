import Statcard from "./Statcard";
import LeaderBoard from "./LeaderBoard";
import { ParticipateBtn, RegisterBtn } from "./Buttons";
import { useFadeInOnScroll } from "~/Hooks/useFadeInOnScroll";

const Hero = () => {
  const fadeInRef = useFadeInOnScroll()
  return (
    <div ref={fadeInRef} className="flex flex-col lg:flex-row justify-between items-center lg:items-start lg:space-x-10 pl-10 pt-10 bg-white opacity-0 transition-opacity duration-1000 ease-in-out">
      <div className="flex-1 mb-10 lg:mb-0 text-center lg:text-left">
        <h1 className="font-medium text-3xl text-primary-700 mb-4">
          སྐད་ཡིག་འབུལ་བ་
        </h1>
        <h2 className="text-2xl font-bold">Preserve, Share, Speak, Empower</h2>
        <p className="text-lg font-medium mb-1">
          Join Hands to Strengthen Tibetan Language Together!
        </p>
        <p className="text-sm text-primary-900 mb-8">
          Join the movement to enhance language understanding and accessibility
          for all official languages of Tibet.
        </p>
        {/* Stats */}
        <div className="space-x-4 flex justify-center lg:justify-start">
          <Statcard count="100+" label="Contributors" />
          <Statcard count="1150+" label="Text Validated" />
          <Statcard count="1203+" label="Duration Recorded" />
        </div>
        <div className="flex justify-center lg:justify-start space-x-4">
          <ParticipateBtn />
          <RegisterBtn />
        </div>
      </div>
      <LeaderBoard />
    </div>
  );
};

export default Hero;
