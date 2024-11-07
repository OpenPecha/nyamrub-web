import React from "react";
import Table from "../../dashboard._index/components/Table";
import Profile from "../../dashboard._index/components/Profile";
import Badge from "../../dashboard._index/components/ContributionDetail";

export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="flex-1 flex-col">
        <Profile />
        <Table />
      </div>

      <Badge />
    </div>
  );
}
