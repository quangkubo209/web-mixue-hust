import { Avatar } from "primereact/avatar";
import DashboardCard from "./DashboardCard";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import logo from "../../assets/images/baycho.jpg";
import RecentOrderRequest from "./RecentOrderRequest";
import AmountCard from "./AmountCard";
import {
  MenusSVG,
  OrdersSVG,
  CustomersSVG,
  IncomesSVG,
  UserSVG,
} from "./IconSVG";
import DailyTrendingMenu from "./DailyTrendingMenu";
import CustomerChart from "./CustomerChart";
import OrderChart from "./OrderChart";
import statApi from "../../api/statApi";
import axios from "axios";
export default function Dashboard() {

  let users;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await statApi.countSome();
        console.log("response", response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div
      className="p-5 w-full h-full"
      style={{
        backgroundColor: "#f7f6f6",
      }}
    >
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-4 gap-8 mb-5">
        <AmountCard name="Total products" amount={56} icon={MenusSVG} />
        <AmountCard name="Total orders" amount={56} icon={OrdersSVG} />
        <AmountCard name="Total users" amount={36} icon={UserSVG} />
      </div>
      <div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-4 gap-8 mb-5">
        <CustomerChart />
        <OrderChart />
      </div>
      <div className="grid xl:grid-cols-3 grid-cols-1 xl:gap-4 gap-8 mb-5">
        <div className="xl:col-start-1 xl:col-end-4 md:w-full">
          <RecentOrderRequest />
        </div>
        {/* <div className="xl:col-start-3 xl:col-end-4 w-full">
          <DailyTrendingMenu />
        </div> */}
      </div>
    </div>
  );
}
