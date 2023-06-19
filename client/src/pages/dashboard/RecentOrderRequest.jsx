import React from "react";
import DashboardCard from "./DashboardCard";
import { Dropdown } from "primereact/dropdown";
import { Avatar } from "primereact/avatar";
import logo from "../../assets/images/logo.png";
import { useState } from "react";

const RecentOrderRequest = () => {
  const [orderLabelFilter, setOrderLabelFilter] = useState("Newest");
  const orderLabelItems = [
    { label: "Newest", value: "newest" },
    { label: "7 days later", value: "7_days_later" },
    { label: "Last Month", value: "last_month" },
  ];

  const orderData = [
    {
      id: "1",
      foodName: "Bánh mì",
      image: logo,
      orderedName: "Ro di",
      orderedAddress: "Arab Saudi",
      amount: 2,
      price: 20000,
      status: 0,
    },
    {
      id: "1",
      foodName: "Bánh mì",
      image: logo,
      orderedName: "Ro di",
      orderedAddress: "Arab Saudi",
      amount: 2,
      price: 20000,
      status: 1,
    },
    {
      id: "1",
      foodName: "Bánh mì",
      image: logo,
      orderedName: "Ro di",
      orderedAddress: "Arab Saudi",
      amount: 2,
      price: 20000,
      status: 2,
    },
    {
      id: "1",
      foodName: "Bánh mì",
      image: logo,
      orderedName: "Ro di",
      orderedAddress: "Arab Saudi",
      amount: 2,
      price: 20000,
      status: 2,
    },
    {
      id: "1",
      foodName: "Bánh mì",
      image: logo,
      orderedName: "Ro di",
      orderedAddress: "Arab Saudi",
      amount: 2,
      price: 20000,
      status: 2,
    },
  ];
  const getStatus = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Accepted";
      case 2:
        return "Rejected";
      default:
        return "Pending";
    }
  };

  const getBgColorStatus = (status) => {
    switch (status) {
      case 0:
        return "#fff6e0";
      case 1:
        return "#e0fff3";
      case 2:
        return "#ffe0e0";
      default:
        return "#fff6e0";
    }
  };
  const getTextColorStatus = (status) => {
    switch (status) {
      case 0:
        return "#F5A623";
      case 1:
        return "#00B894";
      case 2:
        return "#EA4989";
      default:
        return "#F5A623";
    }
  };
  return (
    <DashboardCard>
      <div className="flex justify-between relative">
        <div
          className="
        text-2xl font-semibold
        "
        >
          Recent Order Request
        </div>
        <Dropdown
          value={orderLabelFilter}
          options={orderLabelItems}
          onChange={(e) => setOrderLabelFilter(e.value)}
          placeholder="Newest"
        />
      </div>
      <div className="overflow-x-scroll">
        <table className="mt-5 table-auto w-full">
          <tbody>
            {orderData.map((item, index) => {
              return (
                <tr
                  className="flex justify-between items-center mt-4 p-1 w-full 
                  border-b border-gray-200 cursor-pointer
                  hover:border-gray-300 transition-all duration-200 ease-in-out
                  hover:shadow-md 
                  "
                  key={index}
                >
                  <td className="flex flex-row w-2/5">
                    <Avatar
                      image={logo}
                      size="xlarge"
                      shape="circle"
                      className=" my-2 bg-cover mr-4"
                    />
                    <div className="flex flex-col justify-between py-2">
                      <div>{item.foodName}</div>
                      <div
                        className=""
                        style={{
                          color: "#EA4989",
                        }}
                      >
                        #{item.id}
                      </div>
                    </div>
                  </td>
                  <td className="flex flex-col justify-between w-1/5">
                    <div>{item.orderedName}</div>
                    <div className="opacity-50 text-xs">
                      {item.orderedAddress}
                    </div>
                  </td>
                  <td className="flex flex-row items-baseline justify-center w-1/5 mx-4">
                    <div className="mr-2">${item.price}</div>
                    <div className="opacity-50 text-xs">x{item.amount}</div>
                  </td>
                  <td className="flex xl:justify-between items-center w-1/5">
                    <div
                      className="rounded-xl flex justify-center items-center px-6 py-3 mr-4 text-sm w-24 font-medium"
                      style={{
                        backgroundColor: getBgColorStatus(item.status),
                        color: getTextColorStatus(item.status),
                      }}
                    >
                      {getStatus(item.status)}
                    </div>
                    <i className="pi pi-ellipsis-v" />
                  </td>
                </tr>
              );
            })}
            <tr className="h-1"> </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center text-lg tracking-wide text-red-400 hover:text-red-600 cursor-pointer hover:underline transition-all duration-200 ease-in-out">
        View more
      </div>
    </DashboardCard>
  );
};

export default RecentOrderRequest;
