import { useFadeInOnScroll } from "~/Hooks/useFadeInOnScroll";

export default function About() {
  const fadeInRef = useFadeInOnScroll();
  const steps = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Select Category",
      description:
        "Select one of the category i.e Speak Tibet, Write Tibet, Listen Tibet, OCR Tibet",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.831z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Donate and Validate",
      description:
        "You can donate or validate the content based on your preferences for the chosen category",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Select Category",
      description:
        "Select one of the category i.e Speak Tibet, Write Tibet, Listen Tibet, OCR Tibet",
    },
  ];

  return (
    <div
      ref={fadeInRef}
      className="p-10 opacity-0 transition-opacity duration-2000 ease-in-out"
    >
      <h1 className="font-semibold text-xl text-primary-900 mb-4">
        What is <span className="text-3xl">སྐད་ཡིག་སྲུང་སྐྱོབ།</span> ?
      </h1>
      <p className="text-sm text-neutral-900 mb-8">
        This is an initiative by Monlam AI to crowdsource language inputs for
        Tibetan languages in the form of text, voice and image. as part of
        Project MonlamAI. It calls upon citizens to help build an open
        repository of data to digitally enrich his/her own language.
      </p>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-primary-800 mb-12">
          How it Works?
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg border border-primary-600"
            >
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary-700 text-white mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
