import React from "react";
import DashboardCard from "./DashboardCard";
import { useState, useLayoutEffect } from "react";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";

function CustomerChart() {

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useLayoutEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["January", "February", "March", "April"],
      datasets: [
        {
          label: "New Users",
          backgroundColor: documentStyle.getPropertyValue("--pink-500"),
          borderColor: documentStyle.getPropertyValue("--pink-500"),
          data: [28, 48, 40, 19, 86, 27, 90, 50],
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    setChartData(data);

    setChartOptions(options);
  }, []);
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
          Users
        </div>
      </div>
      <div className="mb-4 flex-grow">
        {Object.keys(chartData).length != 0 && (
          <Chart type="bar" data={chartData} options={chartOptions} className="h-full"/>
        )}
      </div>
    </DashboardCard>
  );
}

export default CustomerChart;
