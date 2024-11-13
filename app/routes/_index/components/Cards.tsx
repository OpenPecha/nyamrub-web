import { ReactNode } from 'react';
import { useFeatureStore } from '~/lib/store';

const FeatureCard = ({ children, id }: { children: ReactNode, id: string }) => {
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);
    return (
        <div className={`absolute flex justify-center items-center ${inViewFeature === id ?"opacity-100":"opacity-0"}`}>
            {children}
        </div>
    );
}

export const SpeakingCard = ({ id }: { id: string }) => {
    return (
        <FeatureCard id={id}>
        <div className="aspect-square bg-primary-200 w-3/4 rounded-2xl flex items-center justify-center">
          I am speaking card
            </div>
        </FeatureCard>
    );
}

export const WritingCard = ({ id }: { id: string }) => {
    return (
        <FeatureCard id={id}>
        <div className="aspect-square bg-primary-200 w-3/4 rounded-2xl">
          I am writing card
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