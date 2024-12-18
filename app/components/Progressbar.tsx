import React from 'react'

export default function Progressbar({totalNumbers}: {totalNumbers: number}) {
    return (
      <div className="h-2 bg-secondary-200 w-full absolute top-0 left-0 md:hidden">
        <div
          className="h-2 bg-secondary-400"
          style={{
            width: `${((6 - totalNumbers) / 5) * 100}%`,
          }}
        ></div>
      </div>
    );
}
