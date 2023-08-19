import React from "react";
import DashboardCard from "./DashboardCard";
function AmountCard({ name, amount, icon }) {
  return (
    <DashboardCard>
      <div className="items-center flex justify-between relative ">
        <div className="">
          {amount !== -1 ? (
            <h2 className="text-black opacity-75 text-2xl font-semibold">
              {amount}
            </h2>
          ) : (
            <h2 className="text-black text-2xl font-semibold" />
          )}
          <p className="mb-0 text-black">{name}</p>
        </div>
        {icon}
      </div>
    </DashboardCard>
  );
}

export default AmountCard;
