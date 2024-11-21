import { Form, Link, useLoaderData, useLocation } from "@remix-run/react";
import { useState } from "react";
import { SiGmail } from "react-icons/si";
import LoginModal from "~/components/LoginModal";

const Header = () => {
  const [isSignoutOpened, setIsSignoutOpened] = useState(false);
  const [showLoginPulse, setShowLoginPulse] = useState(false); // State for pulse animation
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isContributionsPage = location.pathname.includes("/contribution");
  const isAboutPage = location.pathname.includes("/about");
  const isLeaderboardPage = location.pathname === "/leaderboard";

  const toggleSignoutBtn = () => {
    setIsSignoutOpened((prev) => !prev);
  };

  //have put any to remove the errorline , delete this if typesafety is needed
  const { user }:{user:any} = useLoaderData();

  const handleRestrictedClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!user) {
      e.preventDefault(); // Prevent navigation if user is not logged in
      setShowLoginPulse(true); // Trigger the pulse animation
      setTimeout(() => setShowLoginPulse(false), 2000); // Remove the pulse effect after 1 second
    }
  };

  return (
    <header
      className={`py-5 h-[90px] ${isHomePage ? "bg-secondary-600" : "bg-primary-50"}`}
    >
      <div className="flex items-center justify-between px-4">
        <div className="flex-1">
          <Link to="/" className="flex items-center space-x-2">
            {/* <img src="/assets/logo.png" alt="Monlam AI Logo" className="h-8" /> */}
            <div
              className={`${
                isHomePage ? "text-primary-50" : "text-neutral-950"
              } text-xl font-poppins font-semibold`}
            >
              Nyamrub
            </div>
          </Link>
        </div>

        <div className="flex-1">
          <nav className="flex items-center justify-between space-x-10">
            <Link
              to="/contribution/mt/contribute"
              onClick={handleRestrictedClick}
              className={`${
                isHomePage ? "text-primary-50" : "text-primary-950"
              } text-md font-semibold px-3 py-1 rounded-md ${
                isContributionsPage ? "text-white bg-secondary-600" : " hover:bg-neutral-400/20"
              }`}
            >
              Contribute
            </Link>
            <Link
              to="/about"
              onClick={handleRestrictedClick}
              className={`${
                isHomePage ? "text-primary-50" : "text-primary-950"
              } text-md font-semibold px-3 py-1 rounded-md ${
                isAboutPage ? "text-white bg-secondary-600" : "hover:bg-neutral-400/20"
              }`}
            >
              About
            </Link>
            <Link
              to="/leaderboard"
              onClick={handleRestrictedClick}
              className={`${
                isHomePage ? "text-primary-50" : "text-primary-950"
              } text-md font-semibold px-3 py-1 rounded-md ${
                isLeaderboardPage ? "text-white bg-secondary-600" : "hover:bg-neutral-400/20"
              }`}
            >
              Leaderboard
            </Link>
          </nav>
        </div>
        {user ? (
          <div className="flex-1 flex justify-end relative">
            <img
              src={user?.picture}
              alt="User Avatar"
              className="w-12 h-12 rounded-full cursor-pointer"
              onClick={toggleSignoutBtn}
            />
            {isSignoutOpened && (
              <div className="absolute border border-blue-700 shadow-lg right-0 top-full translate-y-2 bg-secondary-700 block w-44 py-2 text-sm font-medium text-white rounded-lg">
                <div className=" px-4  py-2">
                <Form method="post" action="/logout">
                <button className="bg-secondary-50 w-full py-2 text-primary-950 rounded-lg hover:bg-secondary-200 hover:text-white transition cursor-pointer">
                  Sign Out
                </button>
              </Form>
                </div>
             
              <p className=" w-full text-center border-t border-blue-300 mt-2 pt-2 font-bold text-lg">Nyamrub</p>
              <div className=" flex items-center justify-center gap-x-2 text-[10px] w-full ">
            <SiGmail className="inline-block text-primary-500" />
            <p>Techhello@gmail.com</p>
              </div>
              </div>
            )}
          </div>
        ) : (
          <div className={`flex-1 relative`}>
            <LoginModal />
            {showLoginPulse && (
              <>
                <span
                  className={`${
                    showLoginPulse ? "animate-ping" : "none"
                  } absolute right-0 top-0 h-3 w-3 inline-flex rounded-full bg-primary-400 opacity-75`}
                ></span>
                <span
                  className={`absolute right-0 top-0 inline-flex rounded-full h-3 w-3 bg-secondary-600`}
                ></span>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
