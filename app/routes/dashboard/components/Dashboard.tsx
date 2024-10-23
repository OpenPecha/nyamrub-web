import React from 'react'
import Table from './Table';
import Profile from './Profile';
import Badge from './Badge';

export default function Dashboard() {
  
  return (
    <div className="grid grid-cols-12 gap-2 ">
      <div className="col-span-7">
        <Profile />
        <Table />
      </div>

      <Badge />
    </div>
  );
}
