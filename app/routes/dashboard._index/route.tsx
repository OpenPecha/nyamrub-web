import React from "react";
import Profile from "./components/Profile";
import Table from "./components/Table";
import ContributionDetail from "./components/ContributionDetail";

export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="flex-1 flex-col">
        <Profile />
        <Table />
      </div>

      <ContributionDetail />
    </div>
  );
}
