import { IoIosBook } from "react-icons/io";
import { MdHeadphones, MdInsertPhoto } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { NavLink, Outlet, useLocation } from "@remix-run/react";
import Stat from "./Stat";
import Graph from "./Graph";

const MENU_ITEMS = [
  {
    icon: <IoIosBook size={20} />,
    title: "speak",
    tibetanTitle: "ཀློགས།",
    path: "speak/contribution",
  },
  {
    icon: <MdHeadphones size={20} />,
    title: "listen",
    tibetanTitle: "ཉོན།",
    path: "listen/contribution",
  },
  {
    icon: <FaPenNib size={15} />,
    title: "write",
    tibetanTitle: "སྒྱུར།",
    path: "write/contribution",
  },
  {
    icon: <MdInsertPhoto size={15} />,
    title: "OCR",
    tibetanTitle: "བྲིས།",
    path: "OCR/contribution",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  const NavItem = ({ to, icon, tibetanTitle }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-1 cursor-pointer ${
          isActive ? "bg-primary-400 rounded-sm" : ""
        }`
      }
    >
      <div className="p-2 rounded-full text-primary-950">{icon}</div>
      <span className="font-medium text-primary-900 text-sm">
        {tibetanTitle}
      </span>
    </NavLink>
  );

  return (
    <>
      <div className="flex flex-col md:flex-row gap-0 md:gap-1 p-0 md:p-5">
        <div className="p-4 space-y-4">
          {/* Dashboard Link */}
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `block border border-primary-700 w-full p-2 text-sm font-medium cursor-pointer ${
                isActive ? "bg-primary-400 border-0" : ""
              }`
            }
          >
            གཙོ་ངོས།
          </NavLink>

          {/* About Link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block border border-primary-700 w-full p-2 text-sm font-medium cursor-pointer ${
                isActive ? "bg-primary-400 border-0" : ""
              }`
            }
          >
            ང་ཚོའི་སྐོར།
          </NavLink>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {MENU_ITEMS.map((item) => (
              <NavItem
                key={item.title}
                to={item.path}
                icon={item.icon}
                tibetanTitle={item.tibetanTitle}
              />
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full md:max-w-[80vw] md:mx-auto p-4 space-y-4">
          <Outlet />
        </div>
      </div>

      {/* Stats and Graph Section */}
      {!isDashboard && (
        <div className="p-8 w-full space-y-10">
          <Stat />
          <Graph />
        </div>
      )}
    </>
  );
};

export default Sidebar;
