import React from "react";
import Navbar from "@/app/components/SuperAdmin/NavbarSA";
import TotalCard from "@/app/components/SuperAdmin/TotalCardSA";
import SmallCard from "@/app/components/SuperAdmin/SmallCardSA";
import SBarChart from "@/app/components/SuperAdmin/BarchartSA";
import BasicPie from "@/app/components/SuperAdmin/PiechartSA";
import TableMahasiswa from "@/app/components/SuperAdmin/TableMahasiswaSA";
import RecomAi from "@/app/components/SuperAdmin/RecomAiSA";
import DataLengkapM from "@/app/components/SuperAdmin/DataLengkapMSA";

export default function Page() {
  return (
    <div className="flex flex-col bg-white min-h-screen ">
      {/* Header */}
      <Navbar />

      {/* Row for TotalCard and SmallCard */}
      <div className="flex flex-grow p-4 justify-between mt-7">
        <TotalCard />
        <SmallCard />
      </div>

      {/* Row for BarChart and PieChart, aligned horizontally */}
      <div className="flex flex-grow p-1 justify-between mt-7 items-center">
        <div style={{ width: "50%" }}>
          <SBarChart />
        </div>
        <div style={{ width: "40%" }}>
          <BasicPie />
        </div>
      </div>

      <div className="flex flex-grow p-1 justify-between">
        <TableMahasiswa />
      </div>
      <div className="flex flex-grow p-1 justify-between">
        <DataLengkapM />
      </div>
      <div className="flex flex-grow p-4 justify-between">
        <RecomAi />
      </div>
    </div>
  );
}
