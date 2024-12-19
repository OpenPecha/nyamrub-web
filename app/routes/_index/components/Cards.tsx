import { ReactNode } from "react";
import MtComponent from "~/routes/_index/components/MtComponent";
import OCRComponent from "~/routes/_index/components/OCRComponent";
import SttComponent from "~/routes/_index/components/SttComponent";
import TtsComponent from "~/routes/_index/components/TtsComponent";
import { useFeatureStore } from "~/lib/store";

const FeatureCard = ({ children, id }: { children: ReactNode; id: string }) => {
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);
  return (
    <div
      className={`absolute inset-0 flex justify-center items-center h-full transition-opacity ease-linear duration-200 ${
        inViewFeature === id ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export const SpeakingCard = ({ id }: { id: string }) => {
  return (
    <FeatureCard id={id}>
      <div className="aspect-video bg-secondary-50 w-11/12 rounded-xl">
        <TtsComponent />
      </div>
    </FeatureCard>
  );
};

export const WritingCard = ({ id }: { id: string }) => {
  return (
    <FeatureCard id={id}>
      <div className="aspect-video bg-secondary-50 w-11/12 rounded-xl">
        <MtComponent
          currentText={"what you had for lunch?"}
          translatedText={""}
          settranslatedText={() => {}}
        />
      </div>
    </FeatureCard>
  );
};

export const ReadingCard = ({ id }: { id: string }) => {
  return (
    <FeatureCard id={id}>
      <div className="aspect-video bg-secondary-50 w-11/12 rounded-xl">
        <OCRComponent
          currentImgUrl={
            "https://s3.amazonaws.com/nyamrub/ocr/W4PD975-v6_I4PD11280109_0.jpg"
          }
          translatedText={""}
          settranslatedText={() => {}}
        />
      </div>
    </FeatureCard>
  );
};

export const ListeningCard = ({ id }: { id: string }) => {
  return (
    <FeatureCard id={id}>
      <div className="aspect-video bg-secondary-50 w-11/12 rounded-xl">
        <SttComponent
          currentAudioUrl={
            "https://d38pmlk0v88drf.cloudfront.net/wav16k/STT_AM0001_0003_106731_to_113751.wav"
          }
          translatedText={""}
          settranslatedText={() => {}}
        />
      </div>
    </FeatureCard>
  );
};
