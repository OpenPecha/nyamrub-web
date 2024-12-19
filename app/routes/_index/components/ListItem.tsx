import { Link } from '@remix-run/react';
import React from 'react'

interface ListItemProps {
  item: {
    icon: React.ReactNode;
    title: string;
    description: string;
    btnText: string;
    path: string;
  };
  index: number;
}

export default function ListItem({item, index}: ListItemProps) {
    return (
      <li
        key={index}
        className="flex flex-col items-start justify-center w-full md:px-10 space-y-5 h-[70vh] max-md:h-[50vh]"
      >
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-secondary-600 rounded-full flex items-center justify-center">
            {item.icon}
          </div>
          <div>
            <h3 className="text-2xl max-sm:text-xl font-semibold font-monlam">{item.title}</h3>
          </div>
        </div>
        <div>
          <p className="text-lg font-medium text-primary-950 font-monlam leading-2">
            {item.description}
          </p>
        </div>
        <Link
          to={item.path}
          className="bg-secondary-600 text-white p-4 rounded-md font-monlam text-xs"
        >
          {item.btnText}
        </Link>
      </li>
    );
}
