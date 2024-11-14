import { ReactNode } from 'react';
import MtComponent from '~/components/MtComponent';
import { useFeatureStore } from '~/lib/store';

const FeatureCard = ({ children, id }: { children: ReactNode, id: string }) => {
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);
    return (
        <div className={`absolute inset-0 flex justify-center items-center transition-opacity ${inViewFeature === id ?"opacity-100":"opacity-0"}`}>
            {children}
        </div>
    );
}

export const SpeakingCard = ({ id }: { id: string }) => {
    return (
        <FeatureCard id={id}>
        <div className="aspect-square bg-primary-200 w-3/4 rounded-2xl flex items-center justify-center transition duration-500">
          I am speaking card
            </div>
        </FeatureCard>
    );
}

export const WritingCard = ({ id }: { id: string }) => {
    return (
        <FeatureCard id={id}>
        <div className="h-fit px-5 mx-10 py-20 bg-primary-200  rounded-2xl">
                <MtComponent currentText={"what you had for lunch?"} translatedText={""} settranslatedText={() => { }} />
            </div>
        </FeatureCard>
    );
}

export const ReadingCard = ({ id }: { id: string }) => {
    return (
        <FeatureCard id={id}>
        <div className="aspect-square bg-primary-200 w-3/4 rounded-2xl">
          I am reading card
            </div>
        </FeatureCard>
    );
}


export const ListeningCard = ({ id }: { id: string }) => {
    return (
        <FeatureCard id={id}>
        <div className="aspect-square bg-primary-200 w-3/4 rounded-2xl">
          I am listening card
            </div>
        </FeatureCard>
    );
}