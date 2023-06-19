import React from "react";

function DashboardCard({ children }) {
  return (
    <div
      className="flex flex-col bg-white border border-solid border-transparent rounded-lg shadow-md h-full relative transition duration-500 ease-in-out overflow-hidden p-6"
      style={{
        boxShadow: "0 0.3125rem 0.3125rem 0 rgba(82,63,105,.05)",
      }}
    >
      {children}
    </div>
  );
}

export default DashboardCard;
