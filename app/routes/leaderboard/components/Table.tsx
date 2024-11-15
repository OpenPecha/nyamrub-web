import React, { useEffect, useState } from "react";

export default function Table() {
  const [activeTab, setactiveTab] = useState("Overall");
  // const [data, setdata] = useState([]);
  const tabs = ["ཁྱོན་བསྡོམས།", "ཀློགས།", "ཉོན།", "བྲིས།", "སྒྱུར།"];
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
    <div className="w-full h-full flex flex-col justify-center items-center rounded-xl">
      <div className="flex items-center justify-center h-full w-full m-2 rounded-md">
        <nav className="flex justify-between h-full w-full space-x-2 p-1 rounded-md bg-neutral-100">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`w-full rounded-md text-xs py-1  font-monlam ${
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
          <tr className="text-center uppercase text-sm font-medium border-b border-b-neutral-100">
            <th className="py-2 text-sm font-medium">
              མཚན།
              {/* Name */}
            </th>
            <th className="py-2  text-sm font-medium">
              འགྲན་རིམ།
              {/* Rank */}
            </th>
            <th className="py-2  text-sm font-medium">
              ཚིག་གྲུབ་གྲངས།
              {/* Contribution */}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className=" border-b border-b-neutral-100 text-center text-sm font-medium text-primary-950"
            >
              <td>{item.name}</td>
              <td className="border-x border-x-white py-3">{item.rank}</td>
              <td>{item.contribution}</td>
            </tr>
          ))}
          <tr className="text-center text-black text-sm font-medium">
            <th className="py-2 text-sm font-medium">ཁྱེད་ཀྱི་གསོག་སྐར།</th>
            <th className="py-2 text-sm font-medium border-x border-x-white">
              -
            </th>
            <th className="py-2 text-sm font-medium">506</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
