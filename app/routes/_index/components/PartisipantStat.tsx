import { useFadeInOnScroll } from "~/Hooks/useFadeInOnScroll";

const ParticipationStat = () => {
  const fadeInRef = useFadeInOnScroll();
  const participationData = [
    { label: "Total Participation", value: "", isMain: true },
    { label: "Listen Tibet", value: "2000" },
    { label: "Read Tibet", value: "4200" },
    { label: "Write Tibet", value: "1002" },
    { label: "OCR", value: "1202" },
  ];

  return (
    <div
      ref={fadeInRef}
      className="flex flex-col md:flex-row items-center bg-primary-700 text-white border-2 border-primary-600 rounded-lg overflow-hidden m-10 opacity-0 transition-opacity duration-1000 ease-in-out"
    >
      {participationData.map((item, index) => (
        <div
          key={index}
          className={`flex-1 p-4 text-center ${
            item.isMain
              ? "font-bold text-lg"
              : "text-lg border-t-2 md:border-l-2 border-primary-600"
          }`}
        >
          <div className={`${item.isMain ? "" : "text-3xl font-bold"}`}>
            {item.value}
          </div>
          <div>{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ParticipationStat;
