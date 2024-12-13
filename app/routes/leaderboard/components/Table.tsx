import { useLoaderData } from "@remix-run/react";
import {useState, memo } from "react";

// Constants moved outside component to prevent recreating on each render
const TABS = ["ཁྱོན་བསྡོམས།", "ཀློགས།", "ཉོན།", "སྒྱུར།", "བྲིས།"] as const;
const TAB_MAPPING = {
  "ཁྱོན་བསྡོམས།": "overall_top_contributors",
  "ཀློགས།": "listen_contributors",
  "ཉོན།": "speak_contributors",
  "སྒྱུར།": "mt_contributors",
  "བྲིས།": "ocr_contributors",
} as const;

// Memoized TabButton component to prevent unnecessary re-renders
const TabButton = memo(
  ({
    tab,
    isActive,
    onClick,
  }: {
    tab: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      className={`rounded-sm text-sm font-monlam py-2 px-4 ${
        isActive ? "bg-white" : ""
      }`}
      onClick={onClick}
    >
      {tab}
    </button>
  )
);

TabButton.displayName = "TabButton";

// Memoized TableRow component
const TableRow = memo(
  ({
    item,
    index,
  }: {
    item: { username: string; contribution_count: number };
    index: number;
  }) => (
    <tr className="border-b border-b-neutral-100 text-center text-primary-950">
      <td className="text-xs font-monlam">{item.username}</td>
      <td className="py-3 font-poppins">{index + 1}</td>
      <td className="font-poppins">{item.contribution_count}</td>
    </tr>
  )
);

TableRow.displayName = "TableRow";

export default function Table() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(TABS[0]);
  const { user, contributorsData } = useLoaderData();


  const currentData = contributorsData[TAB_MAPPING[activeTab]] || null;
  return (
    <div className="flex flex-col justify-center items-center rounded-xl">
      <div className="flex items-center justify-center h-full w-full p-2 rounded-md">
        <nav className="flex justify-around h-full w-full space-x-2 p-2 rounded-md bg-neutral-100 border">
          {TABS.map((tab) => (
            <TabButton
              key={tab}
              tab={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </nav>
      </div>
        <table className="w-full">
          <thead>
            <tr className="text-center border-b border-b-neutral-100">
              <th className="py-2 text-sm font-monlam">མཚན།</th>
              <th className="py-2 text-sm font-monlam">འགྲན་རིམ།</th>
              <th className="py-2 text-sm font-monlam">ཚིག་གྲུབ་གྲངས།</th>
            </tr>
          </thead>
          <tbody>
            {currentData
              .filter((data) => data.user_id !== user.user_id)
              .map((item: any, index: number) => (
                <TableRow key={item.username} item={item} index={index} />
              ))}

              {/*  current user's contribution */}
            {currentData
              .filter((data) => data.user_id === user.user_id)
              .map((item: any, index: number) => (
                <tr key={item.username} className="text-center text-primary-950">
                  <th className="py-2 text-xs font-monlam">
                    ཁྱེད་ཀྱི་གསོག་སྐར།
                  </th>
                  <th className="py-2 text-sm font-poppins">-</th>
                  <th className="py-2 text-sm font-poppins">
                    {item.contribution_count}
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
    </div>
  );
}
