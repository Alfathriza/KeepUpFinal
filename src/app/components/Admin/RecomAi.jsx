"use client";
import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";

export default function RecomAi() {
  const access_token = Cookie.get("access_token"); // Access token from cookies
  const [summary, setSummary] = useState(""); // State to store the summary

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(
          `https://enormous-mint-tomcat.ngrok-free.app/v1/statistik/psychology/sumarize`, // Adjusted endpoint
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access_token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch the summary.");
        }

        const data = await response.json();
        setSummary(data.data.sumarize); // Update the state with the summary
      } catch (err) {
        console.error(err.message);
        alert("Failed to fetch the summary. Please try again.");
      }
    };

    fetchSummary(); // Automatically fetch the summary on component mount
  }, [access_token]); // Dependency array to trigger on access_token change

   const formatSummary = (text) => {
     const regex = /\*\*(.*?)\*\*/g; // Regex to match text wrapped with double asterisks
     const parts = text.split(regex);

     return parts.map((part, index) =>
       index % 2 === 1 ? (
         <strong key={index}>{part}</strong> // Bold text for matched parts
       ) : (
         <span key={index}>{part}</span> // Regular text for unmatched parts
       )
     );
   };

  const downloadExcelFile = async () => {
    try {
      const response = await fetch(
        `https://enormous-mint-tomcat.ngrok-free.app/v1/export/generate/excel`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download Excel file.");
      }

      const disposition = response.headers.get("Content-Disposition");
      const filename = disposition
        ? disposition.split("filename=")[1].replace(/"/g, "").trim()
        : "default_filename.xlsx";

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err.message);
      alert("Failed to download Excel file. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-start bg-white mt-7 w-full">
      <h2 className="font-semibold text-lg text-slate-900 ">
        Ringkasan Hasil Laporan
      </h2>
      {summary && (
        <div className="mt-4 p-6  rounded-lg border-blue-500 border-2 bg-gray-100 w-full">
          <h3 className="font-semibold text-md text-slate-900 mb-2">
            Ringkasan:
          </h3>
          <p className="text-sm text-slate-800 whitespace-pre-line">
            {formatSummary(summary)}
          </p>
        </div>
      )}
      <button
        className="border rounded-lg p-2 bg-blue-600 font-semibold mt-3"
        onClick={downloadExcelFile}
      >
        Lihat Detail Laporan
      </button>
    </div>
  );
}
