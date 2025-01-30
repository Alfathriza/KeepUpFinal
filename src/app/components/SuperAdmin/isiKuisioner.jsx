"use client";
import React, { useEffect, useState, useRef } from "react";
import { Edit, PlusCircle, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import NavKuisioner from "./navKuisioner";
import Cookies from "js-cookie";

export default function IsiKuisioner() {
  const { id } = useParams();
  const [kuisionerTitle, setKuisionerTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isShowButtonTitle, setIsShowButtonTitle] = useState(true);
  const titleRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditingAnswer, setIsEditingAnswer] = useState(false);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const questionTitleRef = useRef(null);
  const textRef = useRef(null);
  const scoreRef = useRef(null);
  const newQuestionRef = useRef(null);
  const [popupMessage, setPopupMessage] = useState(null);

  const access_token = Cookies.get("access_token");

  const fetchKuisionerData = async () => {
    try {
      const response = await fetch(
        `https://enormous-mint-tomcat.ngrok-free.app/v1/subKuisioner/${id}`,
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
        setQuestions(result.data.questions);
        setKuisionerTitle(result.data.title);
      }
    } catch (error) {
      console.error("Error fetching kuisioner data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchKuisionerData();
    }
  }, [id]);

  const handleSaveTitleClick = () => {
    setKuisionerTitle(titleRef.current.value);
    setIsEditingTitle(false);
  };

  const handleEditClick = (question) => {
    setIsShowButtonTitle(false);
    setSelectedQuestion(question);
    setIsEditingQuestion(true);
    setIsEditingAnswer(false);
  };

  const handleSaveClick = () => {
    const updatedQuestion = {
      ...selectedQuestion,
      question: questionTitleRef.current.value,
    };

    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
    setSelectedQuestion(updatedQuestion);
    setIsEditingQuestion(false);
  };

  const handleSaveAnswerClick = (answerIndex) => {
    const updatedAnswers = [...selectedQuestion.answers];
    updatedAnswers[answerIndex].answer = textRef.current.value;
    updatedAnswers[answerIndex].score = parseInt(scoreRef.current.value, 10);

    const updatedQuestion = {
      ...selectedQuestion,
      answers: updatedAnswers,
    };

    setSelectedQuestion(updatedQuestion);
    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
    setEditIndex(null);
    setIsEditingAnswer(false);
  };

  const handleBackClick = () => {
    if (isEditingAnswer) {
      setIsEditingAnswer(false);
    } else {
      setIsShowButtonTitle(true);
      setSelectedQuestion(null);
      setIsEditingQuestion(false);
    }
  };

  const handleAddQuestion = async () => {
    const newQuestion = {
      question: newQuestionRef.current.value,
      answers: [
        { answer: "Jawaban 1", score: 0 },
        { answer: "Jawaban 2", score: 1 },
        { answer: "Jawaban 3", score: 2 },
        { answer: "Jawaban 4", score: 3 },
      ],
    };

    try {
      const response = await fetch(
        `https://enormous-mint-tomcat.ngrok-free.app/v1/questions/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(newQuestion),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save question.");
      }

      await fetchKuisionerData();
      setPopupMessage("Pertanyaan berhasil disimpan.");
    } catch (error) {
      console.error("Error saving question:", error);
      setPopupMessage("Gagal menyimpan pertanyaan.");
    } finally {
      setTimeout(() => setPopupMessage(null), 3000);
    }

    newQuestionRef.current.value = "";
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await fetch(
        `https://enormous-mint-tomcat.ngrok-free.app/v1/questions/${id}/${questionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete question.");
      }

      await fetchKuisionerData();
      setPopupMessage("Pertanyaan berhasil dihapus.");
    } catch (error) {
      console.error("Error deleting question:", error);
      setPopupMessage("Gagal menghapus pertanyaan.");
    } finally {
      setTimeout(() => setPopupMessage(null), 3000);
    }
  };

  return (
    <div>
      <NavKuisioner
        isEditingAnswer={isEditingAnswer}
        isEditingQuestion={isEditingQuestion}
        handleBackClick={handleBackClick}
        handleSaveClick={handleSaveClick}
        questionId={selectedQuestion?.id}
        questionText={selectedQuestion?.question}
        updateAnswers={selectedQuestion?.answers}
      />
      <div className="mt-4 ml-16" style={{ width: "1400px" }}>
        {!isEditingAnswer && (
          <div className="mb-6">
            <label className="font-semibold text-slate-950 text-sm mb-2 block">
              Judul Kuisioner
            </label>
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
              {isEditingTitle ? (
                <input
                  type="text"
                  defaultValue={kuisionerTitle}
                  ref={titleRef}
                  className="font-semibold text-lg text-slate-950 bg-white border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <h3 className="font-semibold text-lg text-slate-950">
                  {kuisionerTitle}
                </h3>
              )}
              {isShowButtonTitle ? (
                <button
                  onClick={
                    isEditingTitle
                      ? handleSaveTitleClick
                      : () => setIsEditingTitle(true)
                  }
                  className={`flex items-center ${
                    isEditingTitle
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200 text-black"
                  } px-4 py-2 rounded-lg`}
                >
                  {isEditingTitle ? "Save" : "Edit"}
                  <Edit className="ml-2 w-4 h-4" />
                </button>
              ) : null}
            </div>
          </div>
        )}

        {popupMessage && (
          <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded shadow-md">
            {popupMessage}
          </div>
        )}

        {selectedQuestion && selectedQuestion.answers && (
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Edit Pertanyaan
            </h2>
            <div className="flex flex-row items-center mb-4">
              <input
                type="text"
                defaultValue={selectedQuestion.question}
                ref={questionTitleRef}
                className="p-2 border border-gray-300 rounded-lg flex-grow text-black"
              />
              <button
                onClick={handleSaveClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-4"
              >
                Save
              </button>
            </div>
            {selectedQuestion.answers.map((answer, index) => (
              <div
                key={answer.id || index}
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
                        onClick={() => handleSaveAnswerClick(index)}
                        className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg mr-4"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditIndex(index);
                          setIsEditingAnswer(true);
                        }}
                        className="flex items-center bg-gray-200 text-black px-4 py-2 rounded-lg mr-4"
                      >
                        Edit
                      </button>
                      <span className="text-slate-950">
                        Skor: {answer.score}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!selectedQuestion &&
          questions.map((question, index) => (
            <div
              key={question.id || index}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md mb-4"
            >
              <div className="flex flex-row items-start">
                <span className="flex-row mr-4 text-slate-950 font-semibold">
                  {index + 1}.
                </span>
                <p className="flex-row text-slate-950 text-lg">
                  {question.question}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleEditClick(question)}
                  className="flex items-center bg-gray-200 text-black px-4 py-2 rounded-lg mr-2"
                >
                  Edit
                  <Edit className="ml-2 w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Hapus
                  <Trash className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md mb-4">
          <input
            type="text"
            placeholder="Masukkan pertanyaan baru"
            ref={newQuestionRef}
            className="p-2 border border-gray-300 rounded-lg flex-grow text-black"
          />
          <button
            onClick={handleAddQuestion}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg ml-4"
          >
            Tambah Pertanyaan
            <PlusCircle className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
