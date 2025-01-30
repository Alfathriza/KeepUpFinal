"use client";
import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

// Komponen grafik batang
const SimpleBarChart = ({ title, dataset }) => {
  const chartSetting = {
    yAxis: [
      {
        label: "Jumlah Pengisi Kuisioner",
      },
    ],
    series: [{ dataKey: "jumlah", label: "Jumlah Pengisi" }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1200px] min-w-[450px] mx-auto mt-5">
      <div className="w-full h-[400px]">
        <h2 className="font-semibold text-lg text-slate-900 mb-2 text-center">
          {title}
        </h2>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "category" }]}
          {...chartSetting}
        />
      </div>
    </div>
  );
};

export default SimpleBarChart;
