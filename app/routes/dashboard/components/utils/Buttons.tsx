import React from "react";

interface ActionBtnProps {
  text: string;
  style: string;
  isDisabled?: boolean; 
  handleClick: () => void;
}

export default function ActionBtn({
  text,
  style,
  isDisabled = false, 
  handleClick,
}: ActionBtnProps) {
  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`py-2 px-3 min-w-32 rounded-md ${isDisabled && 'opacity-50'} ${style}`}
    >
      {text}
    </button>
  );
}
