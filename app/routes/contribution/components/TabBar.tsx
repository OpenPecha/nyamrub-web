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
        className={`flex items-center space-x-1 cursor-pointer p-1 md:py-1 md:px-4 rounded-full md:rounded-lg ${
          isActive ? "bg-secondary-200 md:bg-neutral-100" : ""
        }`}
      >
        <div className="flex items-center space-x-1">
          <div className="w-7 h-7 rounded-full bg-secondary-500 flex items-center justify-center">
            <Icon className="text-white w-3 h-3" />
          </div>
          <p
            className="text-md font-monlam hidden md:block"
            id={`${tibetanTitle === "བྲིས།" && "step-9"}`}
          >
            {tibetanTitle}
          </p>
        </div>
      </NavLink>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center md:justify-between w-full py-2 bg-white">
        <div className="md:flex-1 py-2">
          <div className="flex w-fit gap-1 ml-2 md:border shadow rounded-lg md:p-2">
            <NavLink
              to={`/contribution/${currentModel}/contribute`}
              className={`px-4 py-2 rounded-l-md md:rounded-md hover:bg-neutral-100 text-black transition text-xs font-monlam ${
                type === "contribute"
                  ? " bg-secondary-400 hover:bg-secondary-500 text-white"
                  : ""
                }`}
              id="step-5"
            >
              ཡིག་སྒྱུར།
            </NavLink>
            <NavLink
              to={`/contribution/${currentModel}/validate`}
              className={`px-4 py-2 rounded-r-md md:rounded-md hover:bg-neutral-100 text-black transition-bg ease-in text-xs font-monlam ${
                type === "validate"
                  ? "bg-secondary-400 hover:bg-secondary-500 text-white"
                  : ""
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
        <div className="flex-1 md:flex justify-end hidden " />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full md:mx-auto space-y-4">
        <Outlet />
      </div>
    </div>
  );
};

export default TabBar;
