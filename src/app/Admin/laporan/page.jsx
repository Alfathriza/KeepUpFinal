"use client";
import React, { useRef } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF
import html2canvas from "html2canvas"; // Import html2canvas
import Navbar from "@/app/components/Admin/Navbar";
import SimpleBarChart from "@/app/components/Admin/BarchartM"; // Ensure this path is correct
import RecomAi from "@/app/components/Admin/RecomAi";
import SBarChart from "@/app/components/Admin/Barchart";
import BasicPie from "@/app/components/Admin/Piechart";
import StatistikKuisionerChartAdmin from "@/app/components/Admin/BarchartM";

const LaporanPage = () => {
  const chartsRef = useRef(); // Ref to capture chart container

  // Function to download PDF
  const downloadPDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Laporan Hasil Kuisioner", 20, 20);
    doc.setFontSize(12);

    let y = 40; // Y-coordinate for text
    for (const [title, data] of Object.entries(datasets)) {
      doc.text(title, 20, y);
      y += 10; // Space between texts
      data.forEach((item) => {
        doc.text(`${item.category}: ${item.jumlah}`, 30, y);
        y += 10; // Space between items
      });
      y += 10; // Space between categories
    }

    // Capture charts after a slight delay to ensure rendering
    setTimeout(async () => {
      const charts = await html2canvas(chartsRef.current);
      const chartsImageData = charts.toDataURL("image/png");

      // Add charts to the PDF
      doc.addImage(chartsImageData, "PNG", 15, y, 180, 150); // Adjust position and size as needed
      doc.save("laporan_kuisioner.pdf");
    }, 1000); // Adjust timeout as necessary
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
          onClick={downloadPDF}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500 transition"
        >
          Download PDF
        </button>
      </div>

      {/* Container for charts */}
      <div ref={chartsRef} className="flex flex-col gap-4 mx-10">
        {/* Bar Chart pertama */}
       
        
          <div
            className="flex flex-col justify-start items-center"
            style={{ marginTop: "20px" }}
          >
            <StatistikKuisionerChartAdmin />
          </div>

        </div>

      <div className="flex flex-grow p-4 justify-between">
        <RecomAi />
      </div>
      <div className="flex flex-grow p-4 justify-between mt-7 items-center">
        <div style={{ width: "50%" }}>
          <SBarChart />
        </div>
        <div style={{ width: "40%" }}>
          <BasicPie />
        </div>
      </div>
    </div>
  );
};

export default LaporanPage;
