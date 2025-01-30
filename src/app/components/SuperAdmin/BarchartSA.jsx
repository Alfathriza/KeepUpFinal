"use client";
import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import Cookies from "js-cookie";

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

export default function SBarChart() {
  const [statistik, setStatistik] = useState({
    Normal: 0,
    Depresi: 0,
    Stress: 0,
    Kecemasan: 0,
    Prokrastinasi: 0,
    Kecanduan: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const access_token = Cookies.get("access_token");

  // Fetch data from API
  useEffect(() => {
    const fetchStatistik = async () => {
      try {
        const response = await fetch(
          "https://enormous-mint-tomcat.ngrok-free.app/v1/statistik/superAdmin",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
              "ngrok-skip-browser-warning": "69420", 
            },
          }
        );
        const result = await response.json();

        if (result.statusCode === 200) {
          setStatistik(result.data.StatistikKuisioner);
        } else {
          throw new Error(`Unexpected statusCode: ${result.statusCode}`);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching statistik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistik();
  }, []);

  // Format data for BarChart
  const dataset = [
    { category: "Normal", jumlah: statistik.Normal },
    { category: "Depresi", jumlah: statistik.Depresi },
    { category: "Stress", jumlah: statistik.Stress },
    { category: "Kecemasan", jumlah: statistik.Kecemasan },
    { category: "Prokrastinasi", jumlah: statistik.Prokrastinasi },
    { category: "Kecanduan Ponsel", jumlah: statistik.Kecanduan },
  ];

  return (
    <div style={{ width: "800px", height: "400px", marginTop: "20px" }}>
      <h2
        className="font-semibold ml-4 text-xl text-slate-900"
        style={{ marginBottom: "10px" }}
      >
        Grafik Hasil Kuisioner
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <BarChart
          dataset={dataset}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "category",
            },
          ]}
          {...chartSetting}
        />
      )}
    </div>
  );
}
