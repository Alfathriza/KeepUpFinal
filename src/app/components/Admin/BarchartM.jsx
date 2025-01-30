"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import SimpleBarChart from "../general/BarchartG";

export default function StatistikKuisionerChartAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const access_token = Cookies.get("access_token");

  useEffect(() => {
    const fetchStatistik = async () => {
      try {
        const response = await fetch(
          "https://enormous-mint-tomcat.ngrok-free.app/v1/statistik/psychology/symtomp",
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

        if (result.statusCode === 200 && result.data?.StatistikKuisioner) {
          // console.log(result)
          const statistikData = result.data.StatistikKuisioner;
          const transformData = (data) => {
            return Object.entries(data)
              .filter(([category]) => category !== "Kecanduan Ponsel") // Exclude "Kecanduan Ponsel"
              .map(([category, levels]) => {
                // Handle special case for "Kecanduan"
                const resolvedCategory =
                  category === "Kecanduan" ? "Kecanduan Ponsel" : category;

                return {
                  title: resolvedCategory,
                  dataset: Object.entries(levels[0]).map(([level, count]) => ({
                    category: level,
                    jumlah: count,
                  })),
                };
              });
          };

          // console.log (statistikData);
          setData(transformData(statistikData));
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistik();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-2 gap-6">
      {data.map((item, index) => (
        <div key={index} className="flex justify-center">
          <SimpleBarChart title={item.title} dataset={item.dataset} />
        </div>
      ))}
    </div>
  );
}
