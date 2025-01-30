import React from "react";

import Page from "./Admin/dashboard/page"
import Mahasiswa from "./Admin/Mahasiswa/page";
import Laporan from "./Admin/laporan/page";


export default function Home() {
  return (
    <div className="flex flex-col bg-white w-full h-full">
      <Page />
      <div className="flex flex-col bg-white w-full h-full">
        <Mahasiswa />
        <Laporan/>
      </div>
    </div>
  );
}

