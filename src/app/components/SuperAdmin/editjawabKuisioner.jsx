"use client";
import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function EditJawabKuisioner({ question, handleBackClick }) {
  const [answers, setAnswers] = useState([]); // Menyimpan jawaban dari pertanyaan yang diterima
  const [editIndex, setEditIndex] = useState(null); // Menyimpan index jawaban yang sedang diedit
  const textRef = useRef(null); // Referensi untuk input text jawaban
  const scoreRef = useRef(null); // Referensi untuk input score jawaban

  // UseEffect untuk mengatur answers jika `question` tersedia
  useEffect(() => {
    if (question && question.answers) {
      setAnswers(question.answers); // Mengisi state answers dengan jawaban dari pertanyaan yang diterima
    }
  }, [question]); // Jalankan ulang jika `question` berubah

  const handleEditClick = (index) => {
    setEditIndex(index); // Menyimpan index dari jawaban yang sedang diedit
  };

  const handleSaveClick = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].answer = textRef.current.value;
    updatedAnswers[index].score = parseInt(scoreRef.current.value, 10);
    setAnswers(updatedAnswers); // Simpan perubahan
    setEditIndex(null); // Keluar dari mode edit
  };

  // Jika `question` belum tersedia, tampilkan loading atau pesan kosong
  if (!question || !answers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4 ml-16" style={{ width: "1400px" }}>
      <div className="flex items-center mb-4">
        <ArrowLeft
          className="mr-2 text-slate-900 cursor-pointer"
          onClick={handleBackClick}
        />
        <label className="font-semibold text-slate-900 text-xl">
          Edit Jawaban
        </label>
      </div>

      <label className="font-semibold text-slate-900 text-l mb-4 mt-4 block">
        Jawaban untuk: {question.question}
      </label>

      {answers.map((answer, index) => (
        <div
          key={answer.id}
          className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md mb-4"
        >
          <div className="flex items-center">
            <span className="flex items-center justify-center w-8 h-8 bg-gray-200 text-black rounded-full mr-4">
              {index + 1}
            </span>
            {editIndex === index ? (
              <input
                type="text"
                defaultValue={answer.answer}
                ref={textRef}
                className="text-slate-950 text-lg bg-white border border-gray-300 rounded px-2 py-1 mr-4"
              />
            ) : (
              <p className="text-slate-950 text-lg">{answer.answer}</p>
            )}
          </div>
          <div className="flex items-center">
            {editIndex === index ? (
              <>
                <input
                  type="number"
                  defaultValue={answer.score}
                  ref={scoreRef}
                  className="text-slate-950 text-lg bg-white border border-gray-300 rounded px-2 py-1 mr-4 w-16"
                />
                <button
                  onClick={() => handleSaveClick(index)}
                  className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg mr-4"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEditClick(index)}
                  className="flex items-center bg-gray-200 text-black px-4 py-2 rounded-lg mr-4"
                >
                  Edit
                </button>
                <span className="text-slate-950">Skor : {answer.score}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
