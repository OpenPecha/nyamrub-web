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
  handleClick=()=>{},
}: ActionBtnProps) {
  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`py-2 px-3 w-20 md:min-w-32 rounded-md ${isDisabled && 'opacity-50'} ${style}`}
    >
      {text}
    </button>
  );
}

export function Skipbtn({handleClick}: {handleClick: () => void}) {
  return (
    <ActionBtn
      text="མཆོང་།"
      style="justify-self-end bg-secondary-500 text-sm font-monlam font-medium text-white md:mr-10"
      handleClick={handleClick}
    />
  );
}

export function Incorrectbtn({handleClick}: {handleClick: () => void}) {
  return (
    <ActionBtn
      text="ནོར་"
      style="bg-secondary-500 text-sm font-monlam font-medium text-white"
      handleClick={handleClick}
    />
  );
}

export function Correctbtn({
  handleClick,
  isDisabled = false,
}: {
  handleClick: () => void;
  isDisabled?: boolean;
  }) {
  return (
    <ActionBtn
      text="འགྲིག"
      style="border border-neutral-950 text-sm font-monlam font-medium text-primary-900"
      isDisabled={isDisabled}
      handleClick={handleClick}
    />
  );
}
