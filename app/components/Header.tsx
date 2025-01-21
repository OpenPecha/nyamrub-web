import { Form, Link, useLoaderData, useLocation } from "@remix-run/react";
import { useState } from "react";
import { SiGmail } from "react-icons/si";
import LoginModal from "~/components/LoginModal";
import { MobileNav } from "./mobile-nav";

const Header = () => {
  const [isSignoutOpened, setIsSignoutOpened] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isContributionsPage = location.pathname.includes("/contribution");
  const isAboutPage = location.pathname.includes("/about");
  const isLeaderboardPage = location.pathname === "/leaderboard";

  const toggleSignoutBtn = () => {
    setIsSignoutOpened((prev) => !prev);
  };

  //have put any to remove the errorline , delete this if typesafety is needed
  const { user, guestUser }:{user:any, guestUser:any} = useLoaderData();

  const handleOnlyUserClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!user) {
      e.preventDefault(); // Prevent navigation if user is not logged in
      setModalOpen(true)
    }
  };
  return (
    <header
      className={`py-2 sm:py-5 md:h-[90px] ${
        isHomePage ? "bg-secondary-600" : "bg-primary-50"
      }`}
    >
      <div className="flex items-center justify-between px-4">
        <div className="flex-1 flex items-center space-x-2">
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
          {!user && !guestUser && (
            <Link
              to="/about"
              className={`${
                isHomePage ? "text-primary-50" : "text-primary-950"
              } text-md font-semibold px-3 py-1 rounded-md text-center hidden md:block ${
                isAboutPage
                  ? "text-white bg-secondary-600"
                  : "hover:bg-neutral-400/20"
              }`}
              id="step-3"
            >
              About Us
            </Link>
          )}
        </div>

        <div className="hidden md:block">
          <nav
            className={`flex items-center ${
              user || guestUser ? "justify-between" : "justify-center"
            } space-x-10`}
          >
            {(user || guestUser) && (
              <>
                <Link
                  to="/contribution/mt/contribute"
                  prefetch="intent"
                  className={`${
                    isHomePage ? "text-primary-50" : "text-primary-950"
                  } text-md font-semibold px-3 py-1 rounded-md ${
                    isContributionsPage
                      ? "text-white bg-secondary-600"
                      : " hover:bg-neutral-400/20"
                  }`}
                >
                  Contribute
                </Link>
                <Link
                  to="/about"
                  prefetch="intent"
                  className={`${
                    isHomePage ? "text-primary-50" : "text-primary-950"
                  } text-md font-semibold px-3 py-1 rounded-md text-center ${
                    isAboutPage
                      ? "text-white bg-secondary-600"
                      : "hover:bg-neutral-400/20"
                  }`}
                  id="step-3"
                >
                  About Us
                </Link>
                <Link
                  to="/leaderboard"
                  prefetch="intent"
                  onClick={handleOnlyUserClick}
                  className={`${
                    isHomePage ? "text-primary-50" : "text-primary-950"
                  } text-md font-semibold px-3 py-1 rounded-md ${
                    isLeaderboardPage
                      ? "text-white bg-secondary-600"
                      : "hover:bg-neutral-400/20"
                  }`}
                  id="step-10"
                >
                  Leaderboard
                </Link>
              </>
            )}
          </nav>
        </div>
        {user ? (
          <div className="flex-1 md:flex hidden justify-end relative">
            <img
              src={user?.picture}
              alt="User Avatar"
              className="w-12 h-12 rounded-full cursor-pointer"
              onClick={toggleSignoutBtn}
            />
            {isSignoutOpened && (
              <div
                className="absolute border border-blue-700 shadow-lg right-0 top-full translate-y-2 bg-secondary-700 block w-44 py-2 text-sm font-medium text-white rounded-lg"
                onMouseLeave={() => setIsSignoutOpened(false)}
              >
                <div className=" px-4  py-2">
                  <Form method="post" action="/logout">
                    <button className="bg-secondary-50 w-full py-2 text-primary-950 rounded-lg hover:bg-secondary-200 hover:text-white transition cursor-pointer">
                      Sign Out
                    </button>
                  </Form>
                </div>

                <p className=" w-full text-center border-t border-blue-300 mt-2 pt-2 font-bold text-lg">
                  Nyamrub
                </p>
                <div className=" flex items-center justify-center gap-x-2 text-[10px] w-full ">
                  <SiGmail className="inline-block text-primary-500" />
                  <p>Techhello@gmail.com</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={`flex-1 relative`}>
            <LoginModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
          </div>
        )}

        <MobileNav
          isHomePage={isHomePage}
          isContributionsPage={isContributionsPage}
          isAboutPage={isAboutPage}
          isLeaderboardPage={isLeaderboardPage}
          user={user}
        />
      </div>
    </header>
  );
};

export default Header;
