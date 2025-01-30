"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function PreKuisioner() {
  const [questions, setQuestions] = useState([]);
  const access_token = Cookies.get("access_token");

  const selectedQuestions = [
    "Menurut Anda, sejauh mana tingkat dukungan keluarga terhadap diri Anda selama ini?",
    "Menurut Anda, manakah kondisi finansial yang paling menggambarkan diri Anda saat ini?",
    "Apakah Anda memiliki riwayat masalah kesehatan yang cukup berat?",
    "Apakah Anda pernah mengalami persoalan pribadi yang berat sehingga membutuhkan bantuan profesional seperti psikolog atau psikiater dalam 6 bulan terakhir ini?",
    "Menurut Anda, sejauh mana kondisi kesehatan Anda saat ini?",
    "Apakah akhir-akhir ini Anda mengalami masalah yang cukup serius dengan orangtua?",
    "Apakah akhir-akhir ini Anda mengalami masalah yang cukup serius dengan saudara/kerabat dekat?",
    "Apakah akhir-akhir ini Anda mengalami masalah yang cukup serius dengan teman?",
    "Apakah akhir-akhir ini Anda mengalami masalah yang cukup serius dengan dosen atau pihak kampus?",
  ];

  useEffect(() => {
    const fetchPreKuisioner = async () => {
      try {
        const response = await fetch(
          `https://enormous-mint-tomcat.ngrok-free.app/v1/statistik/superAdmin/preKuisioner/count`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );

        const result = await response.json();
        if (result.statusCode === 200) {
          const filteredQuestions = result.data.filter((q) =>
            selectedQuestions.includes(q.question)
          );
          setQuestions(filteredQuestions);
        }
      } catch (error) {
        console.error("Error fetching pre-kuisioner data:", error);
      }
    };

    fetchPreKuisioner();
  }, []);

  return (
    <div className="flex flex-col items-center bg-white p-6 w-full">
      <h2 className="font-semibold text-lg text-slate-900 mb-6">
        Statistik Pre-Kuisioner
      </h2>
      <div className="w-full max-w-4xl space-y-6">
        {questions.map((questionItem, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-slate-900 mb-3">
              {questionItem.question}
            </h3>
            <div className="space-y-2">
              {Object.entries(questionItem.answers).map(
                ([answer, count], i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-white p-3 rounded shadow"
                  >
                    <span className="text-slate-900">{answer}</span>
                    <span className="font-semibold text-blue-600">{count}</span>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
