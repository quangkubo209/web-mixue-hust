import React from "react";
import DashboardCard from "./DashboardCard";
import baycho from "../../assets/images/baycho.jpg";
import { Avatar } from "primereact/avatar";
import { TabView, TabPanel } from "primereact/tabview";
import { Dropdown } from "primereact/dropdown";

const trendingMenus = [
  {
    id: 1,
    name: "Bánh mì",
    image: baycho,
    price: 20000,
    amount: 10,
    rank: 1,
  },
  {
    id: 2,
    name: "Bảy trọ",
    image: baycho,
    price: 20000,
    amount: 10,
    rank: 2,
  },
  {
    id: 3,
    name: "Messi",
    image: baycho,
    price: 20000,
    amount: 10,
    rank: 3,
  },
  {
    id: 4,
    name: "Messi",
    image: baycho,
    price: 20000,
    amount: 10,
    rank: 3,
  },
  {
    id: 3,
    name: "Messi",
    image: baycho,
    price: 20000,
    amount: 10,
    rank: 5,
  },
];

function DailyTrendingMenu() {
  return (
    <DashboardCard>
      <div className="flex justify-between relative">
        <div
          className="
      text-2xl font-semibold
      "
          style={{
            marginBottom: "17px",
          }}
        >
          Daily Trending Products
        </div>
      </div>
      <TabView>
        <TabPanel header="Week">
          <div className="overflow-x-scroll">
            <table className="mt-5 table-auto w-full">
              <tbody>
                {trendingMenus
                  .sort((a, b) => a.rank - b.rank)
                  .map((item, index) => {
                    return (
                      <tr
                        className="flex  items-center p-4 w-full 
                border-b border-gray-200 cursor-pointer
                hover:border-gray-300 transition-all duration-200 ease-in-out
                hover:shadow-md "
                        key={index}
                      >
                        <td className="flex justify-start relative mr-4">
                          <Avatar
                            image={item.image}
                            size="xlarge"
                            shape="circle"
                            className="bg-cover flex-shrink-0"
                          />
                          <div
                            className="
                      h-8 w-8 rounded-full bg-white
                      absolute -bottom-2 right-0
                    flex flex-col justify-center items-center
                    "
                          >
                            <div
                              className="
                        text-lg font-semibold
                        bg-red-400
                        rounded-full h-7 w-7
                        flex flex-col justify-center items-center
                        "
                            >
                              #{item.rank}
                            </div>
                          </div>
                        </td>
                        <td className="flex flex-col w-full">
                          <div className="font-normal text-lg mb-2">
                            {item.name}
                          </div>
                          <div className="flex flex-row justify-between items-baseline w-full">
                            <div className="font-bold text-lg mr-4">
                              ${item.price}
                            </div>
                            <div className="font-thin xl:text-sm text-lg whitespace-nowrap	">
                              Order{"  "}
                              <span className=" font-semibold">
                                {item.amount}x
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                <tr className="h-1"></tr>
              </tbody>
            </table>
          </div>
        </TabPanel>
        <TabPanel header="Month">
          <div className="overflow-x-scroll">
            <table className="mt-5 table-auto w-full">
              <tbody>
                {trendingMenus
                  .sort((a, b) => a.rank - b.rank)
                  .map((item, index) => {
                    return (
                      <tr
                        className="flex  items-center p-4 w-full 
                border-b border-gray-200 cursor-pointer
                hover:border-gray-300 transition-all duration-200 ease-in-out
                hover:shadow-md "
                        key={index}
                      >
                        <td className="flex justify-start relative mr-4">
                          <Avatar
                            image={item.image}
                            size="xlarge"
                            shape="circle"
                            className="bg-cover flex-shrink-0"
                          />
                          <div
                            className="
                      h-8 w-8 rounded-full bg-white
                      absolute -bottom-2 right-0
                    flex flex-col justify-center items-center
                    "
                          >
                            <div
                              className="
                        text-lg font-semibold
                        bg-red-400
                        rounded-full h-7 w-7
                        flex flex-col justify-center items-center
                        "
                            >
                              #{item.rank}
                            </div>
                          </div>
                        </td>
                        <td className="flex flex-col w-full">
                          <div className="font-normal text-lg mb-2">
                            {item.name}
                          </div>
                          <div className="flex flex-row justify-between items-baseline w-full">
                            <div className="font-bold text-lg mr-4">
                              ${item.price}
                            </div>
                            <div className="font-thin xl:text-sm text-lg whitespace-nowrap	">
                              Order{"  "}
                              <span className=" font-semibold">
                                {item.amount}x
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                <tr className="h-1"></tr>
              </tbody>
            </table>
          </div>
        </TabPanel>
        <TabPanel header="Year">
          <div className="overflow-x-scroll">
            <table className="mt-5 table-auto w-full">
              <tbody>
                {trendingMenus
                  .sort((a, b) => a.rank - b.rank)
                  .map((item, index) => {
                    return (
                      <tr
                        className="flex  items-center p-4 w-full 
                border-b border-gray-200 cursor-pointer
                hover:border-gray-300 transition-all duration-200 ease-in-out
                hover:shadow-md "
                        key={index}
                      >
                        <td className="flex justify-start relative mr-4">
                          <Avatar
                            image={item.image}
                            size="xlarge"
                            shape="circle"
                            className="bg-cover flex-shrink-0"
                          />
                          <div
                            className="
                      h-8 w-8 rounded-full bg-white
                      absolute -bottom-2 right-0
                    flex flex-col justify-center items-center
                    "
                          >
                            <div
                              className="
                        text-lg font-semibold
                        bg-red-400
                        rounded-full h-7 w-7
                        flex flex-col justify-center items-center
                        "
                            >
                              #{item.rank}
                            </div>
                          </div>
                        </td>
                        <td className="flex flex-col w-full">
                          <div className="font-normal text-lg mb-2">
                            {item.name}
                          </div>
                          <div className="flex flex-row justify-between items-baseline w-full">
                            <div className="font-bold text-lg mr-4">
                              ${item.price}
                            </div>
                            <div className="font-thin xl:text-sm text-lg whitespace-nowrap	">
                              Order{"  "}
                              <span className=" font-semibold">
                                {item.amount}x
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                <tr className="h-1"></tr>
              </tbody>
            </table>
          </div>
        </TabPanel>
      </TabView>
    </DashboardCard>
  );
}

export default DailyTrendingMenu;
