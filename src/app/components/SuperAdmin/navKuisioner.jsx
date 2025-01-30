"use client";
import React from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const access_token = Cookies.get("access_token");

const NavKuisioner = ({
  isEditingAnswer,
  isEditingQuestion,
  handleBackClick,
  handleSaveClick,
  questionId,
  questionText,
  updateAnswers,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (isEditingAnswer || isEditingQuestion) {
      handleBackClick();
    } else {
      router.push("/SuperAdmin/Kuisioner");
    }
  };

  const handleSave = () => {
    Swal.fire({
      title: "Konfirmasi Simpan",
      text: "Apakah Anda yakin ingin menyimpan perubahan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, simpan!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://enormous-mint-tomcat.ngrok-free.app/v1/questions/${questionId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
              "ngrok-skip-browser-warning": "69420", // Replace with a valid token
            },
            body: JSON.stringify({
              question: questionText,
              updateAnswers: updateAnswers,
            }),
          }
        )
          .then((response) => {
            if (response.ok) {
              Swal.fire("Tersimpan!", "Perubahan telah disimpan.", "success");
              handleSaveClick();
            } else {
              Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan.", "error");
            }
          })
          .catch(() => {
            Swal.fire("Gagal!", "Tidak dapat terhubung ke server.", "error");
          });
      }
    });
  };

  return (
    <div className="flex justify-between items-center p-4 mt-3 bg-white border-b border-gray-300">
      <div className="flex items-center">
        <ArrowLeft
          className="mr-2 text-slate-900 cursor-pointer"
          onClick={handleBack}
        />
        <span className="text-lg ml-6 text-slate-950 font-bold">
          Pengaturan Kuisioner
        </span>
      </div>
      <button
        onClick={handleSave}
        className="flex flex-row bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
      >
        Simpan Perubahan
        <Save className="ml-2 w-5 h-5" />
      </button>
    </div>
  );
};

export default NavKuisioner;
