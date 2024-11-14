import React from 'react'

export default function TestComponent() {
  return (
    <div className="grid grid-cols-6 grid-rows-6 w-full py-4 h-full">
      <div className="bg-blue-500 row-span-4">1</div>
      <div className="col-span-4 row-span-4 bg-red-500 shadow-md rounded-3xl overflow-hidden">
        2
      </div>
      <div className="row-span-4 bg-green-500">3</div>
      <div className="col-span-full bg-yellow-500">4</div>
      <div className="col-span-full bg-pink-500">
        <div className="justify-self-end">buttion</div>
      </div>
    </div>
  );
}
