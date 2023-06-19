import React from "react";
import DashboardCard from "./DashboardCard";
function AmountCard({ name, amount, icon }) {
  return (
    <DashboardCard>
      <div className="items-center flex justify-between relative ">
        <div className="">
          <h2 className="text-black opacity-75 text-2xl font-semibold">
            {amount}
          </h2>
          <p className="mb-0 text-black">{name}</p>
        </div>
        {icon}
      </div>
    </DashboardCard>
  );
}

export default AmountCard;
