import React, { useEffect, useState } from "react";

export default function Table() {
  const [activeTab, setactiveTab] = useState("ཁྱོན་བསྡོམས།");
  const [topContributors, setTopContributors] = useState([]);
  const tabs = ["ཁྱོན་བསྡོམས།", "ཀློགས།", "ཉོན།", "སྒྱུར།", "བྲིས།"];
  const data = topContributors["overall_top_contributors"];
  
  const getContributionDetail = async () => {
    try {
      const res = await fetch("/api/top-contributors");
      if (!res.ok) {
        throw new Error("Failed to fetch user's contribution details");
      }
      const data = await res.json();
      console.log("User details:", data);
      setTopContributors(data)
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getContributionDetail();
  }, [activeTab]);
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
          {data?.map((item, index) => (
            <tr
              key={index}
              className=" border-b border-b-neutral-100 text-center text-primary-950"
            >
              <td className=" text-xs font-monlam">{item.username}</td>
              <td className="py-3 font-poppins">{index + 1}</td>
              <td className="font-poppins">{item.contribution_count}</td>
            </tr>
          ))}
          <tr className="text-center text-primary-950">
            <th className="py-2 text-xs font-monlam">ཁྱེད་ཀྱི་གསོག་སྐར།</th>
            <th className="py-2 text-sm font-poppins">-</th>
            <th className="py-2 text-sm font-poppins">506</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
