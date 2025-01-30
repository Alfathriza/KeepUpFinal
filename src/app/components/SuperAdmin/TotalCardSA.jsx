"use client";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function TotalCard() {
  const [totalData, setTotalData] = useState({
    allUser: 0,
    userDoneKuisioner: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const access_token = Cookies.get("access_token");

  useEffect(() => {
    const fetchTotalData = async () => {
      try {
        const response = await fetch(
          "https://enormous-mint-tomcat.ngrok-free.app/v1/statistik/superAdmin/count",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.statusCode === 200 && result.data) {
          setTotalData(result.data);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-start bg-white mt-20 max-w-md">
      <h2 className="font-semibold text-lg text-slate-900 ">
        Total Pengisi Kuisioner
      </h2>
      <div className="flex items-center text-slate-950 font-normal text-xl border rounded-lg border-black mt-3 px-11 py-5">
        <User className="w-7 h-7 mr-2" />
        <h3>
          <span className="font-bold text-2xl">
            {totalData.userDoneKuisioner}
          </span>{" "}
          dari {totalData.allUser}
        </h3>
      </div>
    </div>
  );
}
