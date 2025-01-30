import React from "react";
import Navbar from "@/app/components/SuperAdmin/NavbarSA";
import DataLengkapA from "@/app/components/SuperAdmin/TableAdminSA";


export default function Mahasiswa() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Navbar />
      <div className="flex flex-grow p-4 mt-10 justify-between">
        <DataLengkapA />
      </div>
    </div>
  );
}
