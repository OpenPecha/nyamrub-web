import { IoIosBook } from "react-icons/io";
import { MdHeadphones } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import { useState } from "react";
import Dashboard from "./Dashboard";
import SpeakComponent from "./SpeakComponent";
import RightSection from "./RightSection";

const Sidebar = () => {
  const [activeTab, setactiveTab] = useState("dashboard");
  const menu = [
    { icon: <IoIosBook  size={20}/>, title: "Speak" },
    { icon: <MdHeadphones  size={20}/>, title: "Listen" },
    { icon: <FaPenNib  size={15}/>, title: "Write" },
    { icon: <MdInsertPhoto  size={15}/>, title: "OCR" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-1 h-screen p-10 ">
      <div className="col-span-1 p-4 space-y-4">
        <div
          className={`border border-primary-700 w-full p-2 text-sm font-medium cursor-pointer ${
            activeTab === "dashboard" ? "bg-primary-400 border-0" : ""
          }`}
          onClick={() => setactiveTab("dashboard")}
        >
          Dashboard
        </div>
        <div
          className={`border border-primary-700 w-full p-2 text-sm font-medium cursor-pointer ${
            activeTab === "keyiklen" ? "bg-primary-400 border-0" : ""
          }`}
          onClick={() => setactiveTab("keyiklen")}
        >
          About Keyiklen
        </div>
        <nav className="space-y-2">
          {menu.map((item, index) => (
            <div
              key={index}
              className={`flex items-center space-x-1 cursor-pointer ${
                activeTab === item.title ? "bg-primary-400" : ""
              }`}
              onClick={() => setactiveTab(item.title)}
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

      <div className="col-span-4 p-4 space-y-4">
        {activeTab === "dashboard" && <Dashboard />}
        {/* {activeTab === "Speak" && <SpeakComponent />} */}
        {activeTab !== "dashboard" && <RightSection currentTab={activeTab}/>}
      </div>
    </div>
  );
};

export default Sidebar;
