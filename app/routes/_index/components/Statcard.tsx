import React from "react";

interface StatcardProps {
  count: number;
  label: string;
}

export default function Statcard({ count, label }: StatcardProps) {
  return (
    <div className="flex items-center justify-center flex-col p-4 border border-primary-900 bg-primary-200 rounded-lg transition hover:scale-105">
      <p className="text-xl font-bold">{count}</p>
      <p className="text-primary-900">{label}</p>
    </div>
  );
}
