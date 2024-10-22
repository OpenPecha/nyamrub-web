const Header = () => {
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

        <div>
          {/* <img src="" alt="profile" className="h-12" /> */}
          
        </div>
      </div>
    </header>
  );
};

export default Header;
