import { useFadeInOnScroll } from '~/Hooks/useFadeInOnScroll';
import ScoreBoard from './ScoreBoard';

export default function LeaderBoard() {
  const fadeInRef = useFadeInOnScroll()
    return (
      <div
        ref={fadeInRef}
        className="flex-1 opacity-0 transition-opacity duration-1000 ease-in-out bg-primary-200 rounded-tl-3xl shadow-md border-t border-l border-b border-primary-900"
      >
        <div className="flex items-center justify-between p-5">
          <img src="/assets/logo.png" alt="Monlam AI Logo" className="h-6" />
          <h3 className="flex-1 text-xl font-bold text-center">
            Top Contributors
          </h3>
        </div>
        <ScoreBoard />
      </div>
    );
}
