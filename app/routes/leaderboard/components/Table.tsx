import React, { useEffect, useState } from "react";

export default function Table() {
  const [activeTab, setactiveTab] = useState("Overall");
  // const [data, setdata] = useState([]);
  const tabs = ["ཁྱོན་བསྡོམས།", "ཀློགས།", "ཉོན།", "སྒྱུར།", "བྲིས།"];
  // const tabs = ["Overall", "Speak", "Listen", "Write", "OCR"];
  const data = [
    { name: "བསྟན་འཛིན།", rank: 1, contribution: 20104 },
    { name: "དཔལ་སྒྲོན།", rank: 2, contribution: 12000 },
    { name: "ངག་དབང།", rank: 3, contribution: 11020 },
    { name: "བཀྲ་ཤིས་ལྷ་མོ།", rank: 4, contribution: 9306 },
    { name: "དོན་གྲུབ།", rank: 5, contribution: 4501 },
    // total is 20104 + 12000 + 11020 + 9306 + 4501 = 56931
  ];
  const getContributionDetail = async () => {
    try {
      const res = await fetch("/api/contribution-details");
      if (!res.ok) {
        throw new Error("Failed to fetch user's contribution details");
      }
      const data = await res.json();
      console.log("User details:", data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getContributionDetail();
  }, []);
  return (
    <div className=" flex flex-col justify-center items-center rounded-xl">
      <div className="flex items-center justify-center h-full w-full p-2 rounded-md">
        <nav className="flex justify-around h-full w-full space-x-2 p-2 rounded-md bg-neutral-100 border">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`rounded-sm text-sm font-monlam py-2 px-4 ${
                activeTab === tab ? "bg-white " : ""
              }`}
              onClick={() => setactiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-center border-b border-b-neutral-100">
            <td className="py-2 text-sm font-monlam">མཚན།</td>
            <td className="py-2  text-sm font-monlam">འགྲན་རིམ།</td>
            <td className="py-2  text-sm font-monlam">ཚིག་གྲུབ་གྲངས།</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className=" border-b border-b-neutral-100 text-center text-primary-950"
            >
              <td className=" text-xs font-monlam">{item.name}</td>
              <td className="py-3 font-poppins">{item.rank}</td>
              <td className="font-poppins">{item.contribution}</td>
            </tr>
          ))}
          <tr className="text-center text-primary-950">
            <th className="py-2 text-xs font-monlam">ཁྱེད་ཀྱི་གསོག་སྐར།</th>
            <th className="py-2 text-sm font-poppins">
              -
            </th>
            <th className="py-2 text-sm font-poppins">506</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
