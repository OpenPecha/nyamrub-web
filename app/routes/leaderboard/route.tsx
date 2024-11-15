import React from "react";
import Profile from "./components/Profile";
import Table from "./components/Table";
import ContributionDetail from "./components/ContributionDetail";
import EachContribution from "./components/EachContribution";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-10 grid-rows-3 p-10 gap-2 bg-primary-50 h-full">
      <div className="col-span-6 bg-white shadow-md inset-0 rounded-xl overflow-hidden place-content-center">
        <Profile />
      </div>
      <div className="col-span-4 bg-white shadow-md inset-0 rounded-xl overflow-hidden"></div>
      <div className="row-span-2 col-span-6 bg-white shadow-md inset-0 rounded-xl overflow-hidden">
        <Table />
      </div>
      <EachContribution />
    </div>
  );
}
