import React from "react";
import Navbar from "@/app/components/SuperAdmin/NavbarSA";
import CardKuis from "@/app/components/SuperAdmin/cardKuis";
import NavKuisioner from "@/app/components/SuperAdmin/navKuisioner";
import JudulKuisioner from "@/app/components/SuperAdmin/judulKuisiner";
import IsiKuisioner from "@/app/components/SuperAdmin/isiKuisioner";

export default function Page() {
  return (
    <div className="flex flex-col bg-white min-h-screen ">
      {/* Header */}
      

     
      <IsiKuisioner />
    </div>
  );
}
