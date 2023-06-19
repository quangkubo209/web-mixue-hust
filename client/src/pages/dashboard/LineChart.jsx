import React, { useState } from "react";
import { Chart } from "primereact/chart";
import DashboardCard from "./DashboardCard";
import { Dropdown } from "primereact/dropdown";

function LineChart() {
  const [orderLabelFilter, setOrderLabelFilter] = useState("Newest");
  const orderLabelItems = [
    { label: "3 Recent Months", value: "3" },
    { label: "6 Recnet Months", value: "6" },
    { label: "This year", value: "12" },
  ];

  //   const [basicData] = useState({
  //     labels: ["January", "February", "March", "April", "May", "June", "July"],
  //     datasets: [
  //       {
  //         label: "First Dataset",
  //         data: [65, 59, 80, 81, 56, 55, 40],
  //         fill: false,
  //         borderColor: "#42A5F5",
  //         tension: 0.4,
  //       },
  //       {
  //         label: "Second Dataset",
  //         data: [28, 48, 40, 19, 86, 27, 90],
  //         fill: false,
  //         borderColor: "#FFA726",
  //         tension: 0.4,
  //       },
  //     ],
  //   });

  const [multiAxisData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Income",
        fill: false,
        borderColor: "#42A5F5",
        yAxisID: "y",
        tension: 0.4,
        data: [65, 59, 80, 81, 56, 55, 10],
      },
      {
        label: "Expense",
        fill: false,
        borderColor: "#00bb7e",
        yAxisID: "y1",
        tension: 0.4,
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  });

  //   const [lineStylesData] = useState({
  //     labels: ["January", "February", "March", "April", "May", "June", "July"],
  //     datasets: [
  //       {
  //         label: "First Dataset",
  //         data: [65, 59, 80, 81, 56, 55, 40],
  //         fill: false,
  //         tension: 0.4,
  //         borderColor: "#42A5F5",
  //       },
  //       {
  //         label: "Second Dataset",
  //         data: [28, 48, 40, 19, 86, 27, 90],
  //         fill: false,
  //         borderDash: [5, 5],
  //         tension: 0.4,
  //         borderColor: "#66BB6A",
  //       },
  //       {
  //         label: "Third Dataset",
  //         data: [12, 51, 62, 33, 21, 62, 45],
  //         fill: true,
  //         borderColor: "#FFA726",
  //         tension: 0.4,
  //         backgroundColor: "rgba(255,167,38,0.2)",
  //       },
  //     ],
  //   });

  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    let multiAxisOptions = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          type: "linear",
          display: true,
          position: "left",
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          ticks: {
            color: "#495057",
          },
          grid: {
            drawOnChartArea: false,
            color: "#ebedef",
          },
        },
      },
    };

    return {
      basicOptions,
      multiAxisOptions,
    };
  };

  const { basicOptions, multiAxisOptions } = getLightTheme();

  return (
    <DashboardCard>
      {/* <div className="card">
        <h5>Basic</h5>
        <Chart type="line" data={basicData} options={basicOptions} />
      </div> */}
      <div className="flex justify-between relative">
        <div
          className="
        text-2xl font-semibold
        "
        >
          Revenue
        </div>
        <Dropdown
          value={orderLabelFilter}
          options={orderLabelItems}
          onChange={(e) => setOrderLabelFilter(e.value)}
          placeholder="3 Recent Months"
        />
      </div>
      <div className="mb-4 flex-grow">
        {Object.keys(multiAxisData).length != 0 && (
          <Chart type="line" data={multiAxisData} options={multiAxisOptions} />
        )}
      </div>
      {/* 
      <div className="card">
        <h5>Line Styles</h5>
        <Chart type="line" data={lineStylesData} options={basicOptions} />
      </div> */}
    </DashboardCard>
  );
}

export default LineChart;
