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
        <h1 className="text-3xl font-bold text-primary-900">
          What is Monlam Nyamrub?
        </h1>

        <p className="text-gray-700 text-md font-poppins leading-relaxed">
          This is an initiative by Monlam AI to crowdsource language inputs for
          Tibetan languages in the form of text, voice, and image as part of
          Project MonlamAI. It calls upon citizens to help build an open
          repository of data to digitally enrich their own language.
        </p>

        <p className="text-gray-700 text-md font-poppins leading-relaxed">
          Our mission is to create a comprehensive digital resource that
          preserves and promotes Tibetan languages. Through community
          participation, we're building a valuable repository that will serve
          researchers, learners, and language enthusiasts worldwide.
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
              <span className="text-neutral-800 text-center text-md font-poppins">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


