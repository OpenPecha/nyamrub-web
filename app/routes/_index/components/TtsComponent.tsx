import React from 'react'
import { FaMicrophone } from 'react-icons/fa';
import ActionBtn from '~/components/Buttons';

export default function TtsComponent() {
    return (
        <div className="flex flex-col justify-around items-center h-fit space-y-4 py-5 rounded-md shadow-md bg-primary-50">
          <div className="  flex flex-col space-y-10 text-md font-medium text-center text-primary-900">
            <div className="text-sm font-monlam"> ཚིག་རིས་ཇི་བཞིན་ཀློགས།</div>
          </div>
          <div className="">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-700 cursor-pointer">
              <FaMicrophone
                size={30}
                className="text-white"
                onClick={() => {}}
              />
            </div>
          </div>
          <div className=" flex flex-row items-center justify-center space-x-2">
            <button
              className={`py-2 px-4 w-20 rounded-md text-xs font-monlam font-medium bg-primary-700 text-white `}
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
