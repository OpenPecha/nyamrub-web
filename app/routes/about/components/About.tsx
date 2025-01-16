import { useLoaderData } from "@remix-run/react";

export default function About() {
  const { totalUser } = useLoaderData()
  const totalUserCount = totalUser?.length || 0;
  const stats = [
    {
      value: totalUserCount + "+",
      label: "Active Contributors",
    },
    {
      value: "4",
      label: "Different Medium",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-6">
        <h1 className="text-xl font-bold font-monlam text-secondary-600">
        མཉམ་རུབ་ཅེས་པ་གང་རེད།
        </h1>

        <p className="text-gray-700 text-sm font-monlam leading-loose">
        མཉམ་རུབ་ནི་བོད་ཀྱི་སྐད་ཡིག་དང་རིག་གཞུང་སྲུང་སྐྱོབ་དར་སྤེལ་གཏོང་རྒྱུར་དམིགས་པའི་མཉམ་ལས་ཀྱི་སྡིངས་ཆ་ཞིག་ཡིན།
         བཀོལ་སྤྱོད་པ་རྣམས་ཀྱིས་ཡིག་འབེབས་དང་། ཀློག་འདོན། ཉན་པ། རྩོམ་འབྲི་བཅས་ཀྱི་བྱེད་སྒོ་བརྒྱུད། 
         ཚང་མས་མཉམ་སྤྱོད་ཐུབ་པའི་སྐད་ཡིག་དང་རིག་གཞུང་གི་བང་མཛོད་ཅིག་བསྐྲུན་ཏེ་གྲངས་འཛིན་གྱི་དུས་རབས་འདིར་བོད་ཀྱི་སྐད་ཡིག་རིག་གཞུང་བཅས་པ་གོང་འཕེལ་ཡོང་རྒྱུར་རམ་འདེགས་བྱེད་ཀྱི་ཡོད།
        </p>
        <h1 className="text-xl font-monlam font-bold text-secondary-600">
        ཅིའི་ཕྱིར་མཉམ་རུབ་དགོས་སམ།        </h1>
        <p className="text-gray-700 text-sm font-monlam leading-loose">
        མཉམ་རུབ་ཀྱིས་མི་སྒེར་དང་ཚོགས་སྡེ་སུ་རུང་ལ་བོད་ཀྱི་རིག་གཞུང་སྲུང་སྐྱོབ་ཐད་ནུས་པ་འདོན་རྒྱུའི་ལམ་བུ་ཞིག་བཏོད་ཡོད། འདི་ནི་སྡིངས་ཆ་ཙམ་ཞིག་ག་ལ་ཡིན་ཏེ། འདི་འབྱུང་འགྱུར་བོད་ཀྱི་མི་རབས་གསར་པ་རྣམས་ཀྱི་ཆེད་དུ། 
        རང་གི་སྐད་ཡིག་དང་གཏམ་རྒྱུད། སྲོལ་རྒྱུན་བཅས་གསོན་པོར་གནས་པར་བྱེད་པའི་མཉམ་འབྲེལ་གྱི་ལས་འགུལ་ཞིག་ཡིན། ང་ཚོས་མཉམ་རུབ་ཀྱིས་བོད་ཀྱི་རིག་གཞུང་འཛུགས་སྐྲུན་དང་མཉམ་སྤྱོད། ད་དུང་དར་སྤེལ་གཏོང་རྒྱུར་འབད་པར་བྱ།
        </p>

        <div className="flex flex-row items-end justify-center space-y-2 space-x-2 mt-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-fit h-fit"
            >
              <span className="text-lg sm:text-4xl font-bold text-gray-900 mb-2">
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
