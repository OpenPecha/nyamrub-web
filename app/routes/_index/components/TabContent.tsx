import { ParticipateBtn } from "./Buttons";

export default function TabContent({ activeTab }: { activeTab: string }) {
    return (
        <section className="bg-white p-8 flex items-center justify-between" >
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-gray-800">{activeTab} Tibet</h2>
            <p className="text-md text-gray-600 mt-2">
              <TextContent activeTab={activeTab} />
            </p>
            <ParticipateBtn />
          </div>
          <div className="bg-[#e8dcb7] rounded-md h-48 w-72"></div>
        </section>
    );
}

function TextContent({ activeTab }: { activeTab: string }) {
    switch (activeTab) {
        case "Speak":
            return "A platform where you can enrich your language by donating your voice or validating others voice.";
            break
        case "Listen":
            return "A platform where you can enrich your language by typing the audio that you hear or validate the text transcribed by others.";
            break;
        case "Write":
            return "A platform where you can enrich your language by translating prompted text or validating translations contributed by others.";
            break;
        case "OCR":
            return "A platform where you can enrich your language by typing the text you see or validating images OCRled by others.";
            break;
        default:
            return "default response";
    }
}
