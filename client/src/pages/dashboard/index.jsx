import { Avatar } from "primereact/avatar";
import DashboardCard from "./DashboardCard";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import logo from "../../assets/images/baycho.jpg";
import RecentOrderRequest from "./RecentOrderRequest";
import AmountCard from "./AmountCard";
import {
  MenusSVG,
  OrdersSVG,
  CustomersSVG,
  IncomesSVG,
  StarSVG,
} from "./IconSVG";
import DailyTrendingMenu from "./DailyTrendingMenu";
import RevenueChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

export default function Dashboard() {
  return (
    <div
      className="p-5 w-full h-full"
      style={{
        backgroundColor: "#f7f6f6",
      }}
    >
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 xl:gap-4 gap-8 mb-5">
        <AmountCard name="Menus" amount={56} icon={MenusSVG} />
        <AmountCard name="Orders" amount={56} icon={OrdersSVG} />
        <AmountCard name="Avg. Customer Rating" amount={"1.0"} icon={StarSVG} />
        <AmountCard name="Revenues" amount={4343.4} icon={IncomesSVG} />
      </div>
      <div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-4 gap-8 mb-5">
        <RevenueChart />
        <LineChart />
      </div>
      <div className="grid xl:grid-cols-3 grid-cols-1 xl:gap-4 gap-8 mb-5">
        <div className="xl:col-start-1 xl:col-end-3 md:w-full">
          <RecentOrderRequest />
        </div>
        <div className="xl:col-start-3 xl:col-end-4 w-full">
          <DailyTrendingMenu />
        </div>
      </div>
    </div>
  );
}
