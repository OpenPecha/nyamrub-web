import { IoIosBook } from "react-icons/io";
import { MdHeadphones, MdInsertPhoto } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { NavLink, Outlet, useLocation, useParams } from "@remix-run/react";


const TabBar = () => {
  const location = useLocation();
  const { type } = useParams();
  const currentModel = location.pathname.split("/")[2];

  const MENU_ITEMS = [
    {
      icon: FaPenNib,
      title: "write",
      tibetanTitle: "སྒྱུར།",
      path: "mt/"+type,
    },
    {
      icon: IoIosBook,
      title: "speak",
      tibetanTitle: "ཀློགས།",
      path: "tts/"+type,
    },
    {
      icon: MdHeadphones,
      title: "listen",
      tibetanTitle: "ཉོན།",
      path: "stt/"+type,
    },
    {
      icon: MdInsertPhoto,
      title: "OCR",
      tibetanTitle: "བྲིས།",
      path: "ocr/"+type,
    },
  ];
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
          <div className="w-7 h-7 rounded-full bg-secondary-500 flex items-center justify-center">
            <Icon className="text-white w-3 h-3" />
          </div>
          <p className="text-md font-monlam">{tibetanTitle}</p>
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
              className={`px-4 py-1 rounded-md hover:bg-neutral-100 transition text-xs font-monlam ${
                type === "contribute" ? "bg-neutral-50" : ""
              }`}
            >
              ཡིག་སྒྱུར
            </NavLink>
            <NavLink
              to={`/contribution/${currentModel}/validate`}
              className={`px-4 py-1 rounded-md hover:bg-neutral-100 transition-bg ease-in text-xs font-monlam ${
                type === "validate" ? "bg-neutral-50" : ""
              }`}
            >
              ཞུ་དག
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

export default TabBar;
