import { Form, Link } from "@remix-run/react"
import { useState, useRef, useEffect } from "react"
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx"

interface MobileNavProps {
  isHomePage: boolean
  isContributionsPage: boolean
  isAboutPage: boolean
  isLeaderboardPage: boolean
  user: any
}

export function MobileNav({ isHomePage, isContributionsPage, isAboutPage, isLeaderboardPage, user }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  const toggleNav = () => setIsOpen(!isOpen)

  const handleNavigation = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden" ref={navRef}>
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
        <div className="fixed inset-y-0 right-0 w-64 bg-secondary-700 shadow-lg transform transition-transform duration-300 ease-in-out z-50">
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
                  onClick={handleNavigation}
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
                <Link
                  to="/contribution/mt/contribute"
                  onClick={handleNavigation}
                  className={`text-md font-semibold text-primary-50 text-center rounded-md py-2 transition-colors hover:bg-secondary-500 ${
                    isContributionsPage && "bg-secondary-600 "
                  }`}
                >
                  Contribute
                </Link>
                <Link
                  to="/about"
                  onClick={handleNavigation}
                  className={`text-md font-semibold text-center  rounded-md py-2 text-primary-50 transition-colors hover:bg-secondary-500 ${
                    isAboutPage && "bg-secondary-600"
                  }`}
                >
                  About Us
                </Link>
                <Link
                  to="/leaderboard"
                  onClick={handleNavigation}
                  className={`text-md font-semibold text-center rounded-md py-2 text-primary-50 transition-colors hover:bg-secondary-500 ${
                    isLeaderboardPage && "bg-secondary-600 "
                  }`}
                >
                  Leaderboard
                </Link>
              </div>
            </nav>
            {user && (
              <Form method="post" action="/logout">
                <button className="bg-secondary-200 w-full py-2 text-neutral-950 text-md font-semibold">
                  Sign Out
                </button>
              </Form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

