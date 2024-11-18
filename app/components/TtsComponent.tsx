import React from 'react'
import { FaMicrophone } from 'react-icons/fa';

export default function TtsComponent() {
    return (
      <div className="col-span-4 row-span-4 shadow-md bg-white rounded-3xl overflow-hidden h-full">
        <div className="flex flex-col justify-around items-center h-full py-5">
          <div className="flex-1 flex flex-col space-y-10 text-md font-medium text-center text-primary-900">
            <div className="text-sm font-monlam"> ཚིག་རིས་ཇི་བཞིན་ཀློགས།</div>

            <div className="text-sm font-monlam text-neutral-950">
              ཁྱེད་རང་གང་དུ་འགྲོ་གི་ཡིན་ནམ།
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-300 cursor-pointer">
              <FaMicrophone
                size={30}
                className="text-primary-950"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    );
}
