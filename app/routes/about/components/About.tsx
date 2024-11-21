import React from "react";

export default function About() {
  const stats = [
    {
      value: "10+",
      label: "Active Contributors",
    },
    {
      value: "1000+",
      label: "Data Collected",
    },
    {
      value: "4",
      label: "Different Medium",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-secondary-600">
          What is Nyamrub?
        </h1>

        <p className="text-gray-700 text-md font-poppins leading-relaxed">
          Nyamrub is a collaborative platform dedicated to preserving and
          promoting Tibetan language and culture. By engaging in activities like
          transcribing, reading, listening, and writing, users contribute to
          building a shared repository of linguistic and cultural treasures,
          ensuring they thrive in the digital age.
        </p>
        <h1 className="text-xl font-bold text-secondary-600">
          Why Nyamrub?
        </h1>
        <p className="text-gray-700 text-md font-poppins leading-relaxed">
          Nyamrub empowers individuals and communities to take an active role in
          safeguarding Tibetan heritage. It&apos;s more than a platform—it&apos;s a
          collective movement to keep our language, stories, and traditions
          alive for future generations. Together, let&apos;s build, share, and
          celebrate Tibetan culture!
        </p>

        <div className="flex items-center justify-center space-x-10 mt-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <span className="text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </span>
              <span className="text-neutral-800 text-center text-md font-poppins">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
