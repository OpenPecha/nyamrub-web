import { Form, Link, useLoaderData, useLocation } from "@remix-run/react";
import { useState } from "react";

const Header = () => {
  const [isSignoutOpened, setIsSignoutOpened] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isContributionsPage = location.pathname.includes("/contribution");
  const isAboutPage = location.pathname.includes("/about");
  const isLeaderboardPage = location.pathname === ("/leaderboard");
  const toggleSignoutBtn = () => {
    setIsSignoutOpened((prev) => !prev);
  };

  const { user } = useLoaderData();
  return (
    <header
      className={`py-5 ${isHomePage ? "bg-primary-800" : "bg-primary-50"}`}
    >
      <div className="flex items-center justify-between px-4">
        <div className="flex-1">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/assets/logo.png" alt="Monlam AI Logo" className="h-8" />
            <h1
              className={`${
                isHomePage ? "text-primary-50" : "text-neutral-950"
              } text-xl font-bold"`}
            >
              Monlam AI
            </h1>
          </Link>
        </div>

        <div className="flex-1">
          <nav className="flex items-center justify-between space-x-10">
            <Link
              to="/contribution/mt/contribute"
              className={`${
                isHomePage ? "text-primary-50" : "text-primary-950"
              } text-md font-semibold px-3 py-1 rounded-md ${
                isContributionsPage ? "text-white bg-primary-500" : ""
              }`}
            >
              Contribute
            </Link>
            <Link
              to="/about"
              className={`${
                isHomePage ? "text-primary-50" : "text-primary-950"
              } text-md font-semibold px-3 py-1 rounded-md
              ${isAboutPage ? "text-white bg-primary-500" : ""}`}
            >
              About
            </Link>
            <Link
              to="/leaderboard"
              className={`${
                isHomePage ? "text-primary-50" : "text-primary-950"
              } text-md font-semibold px-3 py-1 rounded-md ${
                isLeaderboardPage ? "text-white bg-primary-500" : ""
              }`}
            >
              Leaderboard
            </Link>
          </nav>
        </div>
        {user && (
          <div className="flex-1 flex justify-end relative">
            <img
              src={user?.picture}
              alt="User Avatar"
              className="w-12 h-12 rounded-full cursor-pointer"
              onClick={toggleSignoutBtn}
            />
            {isSignoutOpened && (
              <Form method="post" action="/logout">
                <button className="absolute right-0 top-full translate-y-2 block w-20 py-1 text-sm font-medium text-primary-950 bg-primary-200 rounded-sm cursor-pointer">
                  Sign Out
                </button>
              </Form>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
