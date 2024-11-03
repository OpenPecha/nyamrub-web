import { IoIosBook } from "react-icons/io";
import { MdHeadphones } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import { useSearchParams } from "@remix-run/react";
import { useState } from "react";
import Dashboard from "./Dashboard";
import RightSection from "./RightSection";
import Stat from "./Stat";
import Graph from "./Graph";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [param, setParam] = useSearchParams();
  const [activeTab, setactiveTab] = useState(param.get("q") || "dashboard");
  const menu = [
    { icon: <IoIosBook size={20} />, title: "Speak" },
    { icon: <MdHeadphones size={20} />, title: "Listen" },
    { icon: <FaPenNib size={15} />, title: "Write" },
    { icon: <MdInsertPhoto size={15} />, title: "OCR" },
  ];

  function paramSetter(text) {
    setParam((p) => {
      p.set("q", text);
      return p;
    });
    setactiveTab(text);
  }
  return (
    <>
      <div className="flex flex-col md:flex-row gap-0 md:gap-1 p-0 md:p-5">
        <div className="p-4 space-y-4">
          <div
            className={`border border-primary-700 w-full p-2 text-sm font-medium cursor-pointer ${
              activeTab === "dashboard" ? "bg-primary-400 border-0" : ""
            }`}
            onClick={() => paramSetter("dashboard")}
          >
            Dashboard
          </div>
          <div
            className={`border border-primary-700 w-full p-2 text-sm font-medium cursor-pointer ${
              activeTab === "keyiklen" ? "bg-primary-400 border-0" : ""
            }`}
          >
            <Link to="/">About Nyamrub</Link>
          </div>
          <nav className="space-y-2">
            {menu.map((item, index) => (
              <div
                key={index}
                className={`flex items-center space-x-1 cursor-pointer ${
                  activeTab === item.title ? "bg-primary-400 rounded-sm" : ""
                }`}
                onClick={() => paramSetter(item.title)}
              >
                <div className="p-2 rounded-full text-primary-950">
                  {item.icon}
                </div>
                <span className="font-medium text-primary-900 text-sm">
                  {item.title}
                </span>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex-1 w-full md:max-w-[80vw] md:mx-auto p-4 space-y-4">
          {activeTab === "dashboard" && <Dashboard />}
          {/* {activeTab === "Speak" && <SpeakComponent />} */}
          {activeTab !== "dashboard" && <RightSection currentTab={activeTab} />}
        </div>
      </div>
      {activeTab !== "dashboard" && (
        <div className="p-8 w-full space-y-10">
          <Stat />
          <Graph />
        </div>
      )}
    </>
  );
};

export default Sidebar;
