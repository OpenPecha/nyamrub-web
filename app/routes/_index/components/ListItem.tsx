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
        className="flex flex-col items-start justify-center w-full md:px-4 space-y-5 h-[70vh] max-md:h-[60vh]"
      >
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-secondary-600 rounded-full flex items-center justify-center">
            {item.icon}
          </div>
          <div>
            <h3 className="text-2xl max-sm:text-xl font-semibold font-monlam">
              {item.title}
            </h3>
          </div>
        </div>
        <div>
          <p className="text-md font-semibold md:font-bold text-primary-950 font-monlam leading-2 mb-2">
            {item.heading}
            </p>
          <p className="text-md font-medium text-primary-950 font-monlam leading-relaxed">
            {item.tibDescription}
          </p>
          {/* <p className="text-md font-medium text-primary-950 font-poppins">
            {item.enDescription}
          </p> */}
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
