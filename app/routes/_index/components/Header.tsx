import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";

const Header = () => {
  const [isSignoutOpened, setIsSignoutOpened] = useState(false);

  const toggleSignoutBtn = () => {
    setIsSignoutOpened((prev) => !prev);
  };

  const { user } = useLoaderData();
  return (
    <header className="bg-white border-b border-[#B39546] py-4">
      <div className="mx-auto px-3 pl-10 flex items-center justify-between">
        <div className="flex items-center justify-space-around">
          <div className="flex items-center">
            <img src="/assets/logo.png" alt="Monlam AI Logo" className="h-8" />
            <div className="ml-2">
              <h1 className="text-2xl font-semibold text-neutral-950 ">
                Monlam AI
              </h1>
            </div>
            <div className="h-16 border-l-2 border-primary-800 rounded-sm mx-5"></div>
          </div>
          <div className="text-start">
            <h2 className="text-lg font-bold text-neutral-950">
              National Language Translation Mission
            </h2>
            <p className="text-sm text-neutral-900">
              Harnessing technology to transcend language barriers
            </p>
          </div>
        </div>

        {user &&<div className="relative mr-5">
          <img
            src={user?.picture}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleSignoutBtn}
          />
          {isSignoutOpened && (
            <Form method="post" action="/logout">
              <button className="absolute right-4 translate-y-2 block w-20 py-1 text-sm font-medium text-primary-950 bg-primary-200 rounded-sm cursor-pointer">
                Sign Out
              </button>
            </Form>
          )}
        </div>}
      </div>
    </header>
  );
};

export default Header;
