import { IoIosBook } from "react-icons/io";
import { MdHeadphones, MdInsertPhoto } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { NavLink, Outlet, useLocation, useParams } from "@remix-run/react";

const MENU_ITEMS = [
  {
    icon: FaPenNib,
    title: "write",
    tibetanTitle: "སྒྱུར།",
    path: "mt/contribute",
  },
  {
    icon: IoIosBook,
    title: "speak",
    tibetanTitle: "ཀློགས།",
    path: "tts/contribute",
  },
  {
    icon: MdHeadphones,
    title: "listen",
    tibetanTitle: "ཉོན།",
    path: "stt/contribute",
  },
  {
    icon: MdInsertPhoto,
    title: "OCR",
    tibetanTitle: "བྲིས།",
    path: "ocr/contribute",
  },
];

const Navbar = () => {
  const location = useLocation();
  const { type } = useParams();
  console.log("type", type);
  const currentModel = location.pathname.split("/")[2];

  const NavItem = ({
    to,
    Icon,
    tibetanTitle,
  }: {
    to: string;
    Icon: any;
    tibetanTitle: string;
  }) => {
    const location = useLocation();
    const isActive = location.pathname.includes(to.split("/")[0]);

    return (
      <NavLink
        to={to}
        end={false}
        className={`flex items-center space-x-1 cursor-pointer py-1 px-4 rounded-lg ${
          isActive ? "bg-neutral-100" : ""
        }`}
      >
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center">
            <Icon className="text-white w-4 h-4" />
          </div>
          <p className="text-3xl font-semibold">{tibetanTitle}</p>
        </div>
      </NavLink>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between w-full py-2 bg-white">
        <div className="flex-1 py-2">
          <div className="flex w-fit gap-1 bg-neutral-200 rounded-md px-2 py-1">
            <NavLink
              to={`/contribution/${currentModel}/contribute`}
              className={`px-4 py-1 rounded-md hover:bg-neutral-50 transition ${
                type === "contribute" ? "bg-neutral-100" : ""
              }`}
            >
              ཡིག་སྒྱུར
            </NavLink>
            <NavLink
              to={`/contribution/${currentModel}/validate`}
              className={`px-4 py-1 rounded-md hover:bg-neutral-50 transition ${
                type === "validate" ? "bg-neutral-100" : ""
              }`}
            >
              ཟུར་དག
            </NavLink>
          </div>
        </div>
        <nav className="flex-1 flex items-center justify-center space-x-3">
          {MENU_ITEMS.map((item) => (
            <NavItem
              key={item.title}
              to={item.path}
              Icon={item.icon}
              tibetanTitle={item.tibetanTitle}
            />
          ))}
        </nav>
        <div className="flex-1 flex justify-end" />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full md:mx-auto space-y-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
