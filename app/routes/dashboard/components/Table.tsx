import React, { useState } from "react";

export default function Table() {
  const [activeTab, setactiveTab] = useState("Overall");
  const tabs = ["Overall", "Speak", "Listen", "Write", "OCR"];
  const data = [
    { name: "Tenzin Monlam", rank: 1, contribution: 20000 },
    { name: "Tenzin Sonam", rank: 2, contribution: 12000 },
    { name: "Tenzin Dolma", rank: 3, contribution: 10000 },
    { name: "Tenzin Kalden", rank: 4, contribution: 9000 },
    { name: "Tenzin Chalung", rank: 5, contribution: 4000 },
    ];
  return (
    <div className="w-full">
      <nav className="flex justify-between w-full space-x-2 my-3">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`w-full py-2 rounded-md text-sm font-medium ${
              activeTab === tab
                ? "bg-primary-400 "
                : "border border-primary-300"
            }`}
            onClick={() => setactiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
      <table className="w-full">
        <thead>
          <tr className="text-center bg-primary-700 uppercase text-sm font-medium">
            <th className="py-2 text-white text-sm font-medium">Name</th>
            <th className="py-2 text-white text-sm font-medium border-x border-x-white">
              Rank
            </th>
            <th className="py-2 text-white text-sm font-medium">
              Contribution
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="bg-primary-100 border-b border-b-primary-300 text-center text-sm font-medium text-primary-950"
            >
              <td>{item.name}</td>
              <td className="border-x border-x-white py-3">{item.rank}</td>
              <td>{item.contribution}</td>
            </tr>
          ))}
          <tr className="text-center text-black text-sm  bg-primary-400 font-medium">
            <th className="py-2 text-sm font-medium">Your Rank</th>
            <th className="py-2 text-sm font-medium border-x border-x-white">
              -
            </th>
            <th className="py-2 text-sm font-medium">0</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}