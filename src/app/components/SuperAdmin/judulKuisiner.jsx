"use client"
import React, { useState, useRef } from "react";
import { Edit } from "lucide-react";

export default function JudulKuisioner() {
  const [isEditing, setIsEditing] = useState(false);
  const [judulKuisioner, setJudulKuisioner] = useState(
    "Kesejahteraan Emosional dan Mental"
  );
  const titleRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true); // Set to editing mode
  };

  const handleSaveClick = () => {
    setJudulKuisioner(titleRef.current.value); // Update the title with the new value
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="mt-4 ml-16" style={{ width: "1400px" }}>
      <label className="font-semibold text-slate-950 text-sm mb-2 block">
        Judul Kuisioner
      </label>
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
        {isEditing ? (
          <input
            type="text"
            defaultValue={judulKuisioner}
            ref={titleRef}
            className="font-semibold text-lg text-slate-950 bg-white border border-gray-300 rounded px-2 py-1"
          />
        ) : (
          <h3 className="font-semibold text-lg text-slate-950">
            {judulKuisioner}
          </h3>
        )}
        <button
          onClick={isEditing ? handleSaveClick : handleEditClick}
          className={`flex items-center ${
            isEditing ? "bg-blue-700 text-white" : "bg-gray-200 text-black"
          } px-4 py-2 rounded-lg`}
        >
          {isEditing ? "Save" : "Edit"}
          <Edit className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
