import { Form, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";

const Header = () => {
  const [isSignoutOpened, setIsSignoutOpened] = useState(false);

  const toggleSignoutBtn = () => {
    setIsSignoutOpened((prev) => !prev);
  };

  const { user } = useLoaderData();
  return (
    <div className="bg-primary-800 h-screen">
      <header className="pt-8">
        <div className="flex items-center justify-between px-4">
          <div className="flex-1">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/assets/logo.png"
                alt="Monlam AI Logo"
                className="h-8"
              />
              <h1 className="text-primary-50 text-xl font-semibold">
                Monlam AI
              </h1>
            </Link>
          </div>

          <div className="flex-1">
            <nav className="flex items-center justify-between space-x-10">
              <Link
                to="/contribute"
                className="text-primary-50 text-md font-semibold"
              >
                Contribute
              </Link>
              <Link to="/about" className="text-primary-50 text-md font-semibold">
                About
              </Link>
              <Link
                to="/leaderboard"
                className="text-primary-50 text-md font-semibold"
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
      <div className="flex items-center justify-center h-full bg-[url('/assets/nyamrup.png')] bg-center bg-cover">
        <div className="text-white text-6xl">སྨོན་ལམ་མཉམ་རུབ།</div>
      </div>
    </div>
  );
};

export default Header;
