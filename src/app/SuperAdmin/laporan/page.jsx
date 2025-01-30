"use client";
import React, { useState, useRef } from "react";
import Navbar from "@/app/components/SuperAdmin/NavbarSA";
import RecomAi from "@/app/components/SuperAdmin/RecomAiSA";
import SBarChart from "@/app/components/SuperAdmin/BarchartSA";
import BasicPie from "@/app/components/SuperAdmin/PiechartSA";
import Cookies from "js-cookie";
import StatistikKuisionerChart from "@/app/components/SuperAdmin/BarchartMSA";
import FacultyMajorPieChart from "@/app/components/SuperAdmin/Piechartfac";
import PreKuisioner from "@/app/components/SuperAdmin/prekuisioner";

const LaporanPage = () => {
  const chartsRef = useRef();
  const [datasets, setDatasets] = useState({});
  const [loading, setLoading] = useState(true);

  const downloadExcel = async () => {
    try {
      const access_token = Cookies.get("access_token"); // Retrieve the access token

      if (!access_token) {
        throw new Error("Access token is missing.");
      }

      const response = await fetch(
        "https://enormous-mint-tomcat.ngrok-free.app/v1/export/generate/excel",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "ngrok-skip-browser-warning": "69420", // Corrected template literal
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to download Excel file: ${errorText}`);
      }
      const headers = Array.from(response.headers.entries());
      console.log("Response Headers:", headers);
      // Extract filename from Content-Disposition header
      const disposition = response.headers.get("Content-Disposition");
      const filename = disposition
        ? disposition.split("filename=")[1].replace(/"/g, "").trim()
        : "default_filename.xlsx";

      // Convert the response to Blob (Excel file)
      return response.blob().then((blob) => {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element and trigger a download
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();

        // Revoke the object URL after the download
        window.URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error("Error downloading Excel file:", error);
      alert(
        `Failed to download Excel file: ${error.message}. Please try again.`
      );
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Navbar />
      <div className="flex flex-col items-start ml-8 bg-white mt-28 max-w-md">
        <h2 className="font-semibold text-lg text-slate-900 ">
          Laporan Hasil Kuisioner
        </h2>
      </div>
      <div className="flex justify-end mt-2 mr-10">
        <button
          onClick={downloadExcel}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500 transition"
        >
          Download Excel
        </button>
      </div>

      {/* Container for charts */}
      <div ref={chartsRef} className="flex flex-col gap-4 mx-10">
        <div
          className="flex flex-col justify-start items-center"
          style={{ marginTop: "20px" }}
        >
          <StatistikKuisionerChart />
        </div>
        <div
          className="flex flex-col justify-start items-center"
          style={{ marginTop: "10px" }}
        >
          <PreKuisioner />
        </div>
      </div>
      <div className="flex flex-grow p-4 justify-between mt-7 items-center">
        <div style={{ width: "50%" }}>
          <SBarChart />
        </div>
        <div style={{ width: "40%" }}>
          <BasicPie />
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <FacultyMajorPieChart />
      </div>
      <div className="flex flex-grow p-4 justify-between">
        <RecomAi />
      </div>
    </div>
  );
};

export default LaporanPage;
