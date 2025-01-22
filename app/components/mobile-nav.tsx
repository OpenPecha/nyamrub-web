import { Form, Link, useFetcher } from "@remix-run/react";
import { useState, useRef, useEffect } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import LoginPopup from "./LoginPopup";
import LoginPortal from "./LoginPortal";

interface MobileNavProps {
  isHomePage: boolean;
  isContributionsPage: boolean;
  isAboutPage: boolean;
  isLeaderboardPage: boolean;
  user: any;
  guestUser: any;
}

export function MobileNav({
  isHomePage,
  isContributionsPage,
  isAboutPage,
  isLeaderboardPage,
  user,
  guestUser,
}: MobileNavProps) {
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleNav = () => setIsOpen(!isOpen);

  const closeSidebar = () => {
    setIsOpen(false);
  };
  const handleClickOutside = (e) => {
    if (navRef.current && !navRef.current.contains(e.target as Node)) {
      console.log("clicked outside");
    }
  }
  const handleParticipant = async () => {
    fetcher.submit(null, {
      method: "post",
      action: "/api/participate",
    });
  };

  useEffect(() => {
    if(fetcher.state === "idle") {
      closeSidebar();
    }
  }, [fetcher.state]);
  return (
    <div className="md:hidden">
      <button
        onClick={toggleNav}
        className={`p-2 focus:outline-none ${
          isHomePage ? "text-primary-50" : "text-primary-950"
        }`}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <RxCross1 className="h-6 w-6" />
        ) : (
          <RxHamburgerMenu className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-y-0 right-0 w-64 bg-secondary-700 shadow-lg transform transition-transform duration-300 ease-in-out z-50"
          ref={navRef}
          onClick={handleClickOutside}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-blue-700">
              {user ? (
                <img
                  src={user?.picture}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <Link
                  to="/"
                  onClick={closeSidebar}
                  className="text-lg font-bold text-primary-50"
                >
                  Nyamrub
                </Link>
              )}
              <button onClick={toggleNav} className="text-primary-50">
                <RxCross1 className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-grow overflow-y-auto">
              <div className="flex flex-col space-y-3 p-4">
                {(user || guestUser) && (
                  <Link
                    to="/contribution/mt/contribute"
                    onClick={closeSidebar}
                    className={`text-md font-semibold text-primary-50 text-center rounded-md py-2 transition-colors hover:bg-secondary-500 ${
                      isContributionsPage && "bg-secondary-600 "
                    }`}
                  >
                    Contribute
                  </Link>
                )}
                <Link
                  to="/about"
                  onClick={closeSidebar}
                  className={`text-md font-semibold text-center  rounded-md py-2 text-primary-50 transition-colors hover:bg-secondary-500 ${
                    isAboutPage && "bg-secondary-600"
                  }`}
                >
                  About Us
                </Link>
                <Link
                  to={"/leaderboard"}
                  onClick={() => (user ? closeSidebar : setModalOpen(true))}
                  className={`text-md font-semibold text-center rounded-md py-2 text-primary-50 transition-colors hover:bg-secondary-500 ${
                    isLeaderboardPage && "bg-secondary-600 "
                  }`}
                >
                  Leaderboard
                </Link>
                {!guestUser && !user && (
                  <button
                    className="bg-secondary-200 w-full py-2 text-neutral-950 text-md font-semibold"
                    type="submit"
                    onClick={handleParticipant}
                  >
                    Participate
                  </button>
                )}
                {!user && (
                  <button
                    className="bg-secondary-200 w-full py-2 text-neutral-950 text-md font-semibold"
                    onClick={() => setModalOpen(true)}
                  >
                    Register
                  </button>
                )}
              </div>
            </nav>
            {user ? (
              <Form method="post" action="/logout">
                <button className="bg-secondary-200 w-full py-2 text-neutral-950 text-md font-semibold">
                  Sign Out
                </button>
              </Form>
            ) : (
              <div className="text-center w-full py-2 text-primary-500 text-md font-semibold font-monlam">
                མཉམ་རུབ།
              </div>
            )}
          </div>
        </div>
      )}

      <LoginPortal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}
