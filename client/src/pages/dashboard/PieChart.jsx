import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import { Chart } from "primereact/chart";
import DashboardCard from "./DashboardCard";
import { classNames } from "primereact/utils";
function PieChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useLayoutEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
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
          PieChart
        </div>
      </div>
      <div className="mb-4">
        {Object.keys(chartData).length != 0 && (
          <Chart
            type="pie"
            data={chartData}
            options={chartOptions}
            className="w-full flex items-center justify-center"
          />
        )}
      </div>
    </DashboardCard>
  );
}

export default PieChart;
