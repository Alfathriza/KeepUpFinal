import React from "react";
import Navbar from "@/app/components/SuperAdmin/NavbarSA";
import CardKuis from "@/app/components/SuperAdmin/cardKuis";

export default function Page() {
  return (
    <div className="flex flex-col bg-white min-h-screen ">
      {/* Header */}
      <Navbar />

      <div className="flex flex-grow p-4 justify-between mt-7">
        <CardKuis />
        
      </div>

    </div>
  );
}
