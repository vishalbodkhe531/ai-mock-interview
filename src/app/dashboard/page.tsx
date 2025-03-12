import React from "react";
import AddNewInterview from "./_components/AddNewInterview";

function Dashboard() {
  return (
    <>
      <div className="p-10">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <h1 className="text-gray-500">Create and start your AI Mockup</h1>
        <div className="grid grid-col-1 md:grid-cols-3 my-5">
          <AddNewInterview />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
