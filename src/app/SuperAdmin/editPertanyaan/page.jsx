"use client";
import React, { useState } from "react";
import EditKuisioner from "@/app/components/SuperAdmin/editKuisioner";
import EditJawabKuisioner from "@/app/components/SuperAdmin/editjawabKuisioner";
import { Save } from "lucide-react";
import Swal from "sweetalert2";

export default function Page() {
  const [questions, setQuestions] = useState([
    "Bagaimana Anda biasanya bereaksi ketika menghadapi situasi yang sangat menegangkan?",
  ]);

  const [answers, setAnswers] = useState([
    {
      id: "A",
      text: "Saya cenderung tetap tenang dan mencari solusi.",
      score: 5,
    },
    {
      id: "B",
      text: "Saya cenderung tetap tenang dan mencari solusi.",
      score: 5,
    },
    {
      id: "C",
      text: "Saya cenderung tetap tenang dan mencari solusi.",
      score: 5,
    },
    {
      id: "D",
      text: "Saya cenderung tetap tenang dan mencari solusi.",
      score: 5,
    },
  ]);

  const handleSaveChanges = async () => {
    try {
      // Implement the logic to send data to the user view
      // This could involve an API call or state management
      console.log("Questions: ", questions);
      console.log("Answers: ", answers);

      // Simulate successful save with a promise
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Perubahan berhasil disimpan!",
      });
    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Perubahan gagal disimpan!",
      });
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen p-4">
      <EditKuisioner questions={questions} setQuestions={setQuestions} />
      <EditJawabKuisioner answers={answers} setAnswers={setAnswers} />
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSaveChanges}
          className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Save className="w-4 h-4 mr-2" />
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
