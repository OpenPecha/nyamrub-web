import { FaMicrophone } from 'react-icons/fa';

export default function TtsComponent() {
    return (
      <div className="flex flex-col justify-around items-center h-fit space-y-4  py-4 bg-primary-50 shadow-md rounded-xl">
        <div className="  flex flex-col space-y-10 text-md font-medium text-center text-primary-900">
          <div className="text-sm font-monlam"> ཚིག་རིས་ཇི་བཞིན་ཀློགས།</div>
        </div>
        <div className="">
          <div className="flex items-center justify-center h-10 lg:h-16 w-10 lg:w-16 rounded-full bg-secondary-600 cursor-pointer">
            <FaMicrophone  className="text-white h-5 lg:h-8 w-5 lg:w-8" onClick={() => {}} />
          </div>
        </div>
        <div className=" flex flex-row items-center justify-center space-x-2">
          <button
            className={`py-2 px-4 w-20 rounded-md text-xs font-monlam font-medium bg-secondary-500 text-white `}
          >
            མཆོང་།
          </button>
          <button
            className={`py-2 px-4 w-20 rounded-md text-xs border border-neutral-950 font-monlam font-medium text-primary-900 `}
          >
            འགྲིག
          </button>
        </div>
      </div>
    );
}
