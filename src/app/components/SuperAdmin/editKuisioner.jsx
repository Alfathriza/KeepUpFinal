"use client";
import React, { useState, useEffect } from "react";
import { Edit, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import EditJawabKuisioner from "./editjawabKuisioner"; // Import EditJawabKuisioner

export default function EditKuisioner() {
  const [questionsData, setQuestionsData] = useState([]); // State untuk menyimpan data pertanyaan dari API
  const [selectedQuestion, setSelectedQuestion] = useState(null); // State untuk menyimpan pertanyaan yang sedang di-edit
  const router = useRouter(); // Initialize useRouter for navigation

  // Fetch data dari API
  useEffect(() => {
    const fetchKuisionerData = async () => {
      try {
        const response = await fetch(
          "https://enormous-mint-tomcat.ngrok-free.app/v1/subKuisioner/cd191bdd-8fea-4d6a-81b5-380de93cad59", // URL API
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRhZWVmZGUxLWFiNWYtNDEyOS1iZGUyLTlmZWFjZThlOTMxNSIsInVzZXIiOiJNdWhhbW1hZCBEYWZmYSBSYWloYW4gU3VwZXJBZG1pbiIsInJvbGUiOiIzOGQzMjIzYS0xMjYwLTQyYmYtYTMxNy02N2JlZDZlYmE2ODEiLCJpYXQiOjE3Mjk3NzM1NDgsImlzcyI6IkFwaUtlZXBVcCIsImF1ZCI6IktlZXBVcCIsImV4cCI6MTcyOTc3NzE0OH0.UI1soTMxoqoZhoiqJ2B_G1VgEpTLzdHukP3Zmpbhx9w`, // Token autentikasi
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        const result = await response.json();
        if (result.statusCode === 200) {
          setQuestionsData(result.data.questions); // Simpan data questions dari respons API
        }
      } catch (error) {
        console.error("Error fetching kuisioner data:", error);
      }
    };

    fetchKuisionerData(); // Panggil fungsi fetch ketika komponen di-mount
  }, []);

  const handleEditClick = (question) => {
    setSelectedQuestion(question); // Simpan pertanyaan yang dipilih untuk diedit
  };

  // Fungsi untuk kembali ke halaman sebelumnya
  const handleBackClick = () => {
    setSelectedQuestion(null); // Kembali dari mode edit
  };

  return (
    <div className="mt-4 ml-16" style={{ width: "1400px" }}>
      {selectedQuestion ? (
        // Jika ada pertanyaan yang dipilih untuk diedit, tampilkan EditJawabKuisioner
        <EditJawabKuisioner
          question={selectedQuestion}
          handleBackClick={handleBackClick}
        />
      ) : (
        // Tampilkan daftar pertanyaan
        <>
          <div className="flex items-center mb-4">
            <ArrowLeft
              className="mr-2 text-slate-900 cursor-pointer"
              onClick={handleBackClick}
            />
            <label className="font-semibold text-slate-900 text-xl">
              Edit Pertanyaan
            </label>
          </div>

          <label className="font-semibold text-slate-900 text-l mb-4 mt-4 block">
            Pertanyaan
          </label>
          {questionsData.map((question, index) => (
            <div
              key={question.id}
              className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md mb-4"
            >
              <div className="flex flex-row items-start justify-between">
                <div className="flex flex-row items-start">
                  <span className="mr-4 text-slate-950 font-semibold">
                    {index + 1}.
                  </span>
                  <p className="text-slate-950 text-lg">{question.question}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleEditClick(question)} // Kirim pertanyaan yang dipilih untuk diedit
                    className="flex items-center bg-gray-200 text-black px-4 py-2 rounded-lg"
                  >
                    Edit
                    <Edit className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
