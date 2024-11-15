import React from 'react'

interface ListItemProps {
  item: {
    icon: React.ReactNode;
    title: string;
    description: string;
    btnText: string;
  };
  index: number;
}

export default function ListItem({item, index}: ListItemProps) {
    return (
      <li
        key={index}
        className="flex flex-col items-start justify-center w-full px-10 space-y-5 h-[70vh]"
      >
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-primary-700 rounded-full flex items-center justify-center">
            {item.icon}
          </div>
          <div>
            <h3 className="text-2xl font-semibold font-monlam">{item.title}</h3>
          </div>
        </div>
        <div>
          <p className="text-lg font-medium text-primary-950 font-monlam">
            {item.description}
          </p>
        </div>
        <button className="bg-primary-700 text-white p-4 rounded-md font-monlam text-xs">
          {item.btnText}
        </button>
      </li>
    );
}
