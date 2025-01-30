"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function TableMahasiswa() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const access_token = Cookies.get("access_token");

  const downloadStudentExcel = async (userId) => {
    try {
      const response = await fetch(
        `https://enormous-mint-tomcat.ngrok-free.app/v1/export/generate/excel/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to download Excel file for userId: ${userId}`);
      }

      const disposition = response.headers.get("Content-Disposition");
      const filename = disposition
        ? disposition.split("filename=")[1].replace(/"/g, "").trim()
        : "default_filename.xlsx";

      return response.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      });
    } catch (err) {
      console.error(err.message);
      alert(
        `Failed to download Excel for userId: ${userId}. Please try again.`
      );
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "https://enormous-mint-tomcat.ngrok-free.app/v1/statistik/superAdmin/user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (
          result.statusCode === 200 &&
          result.data &&
          Array.isArray(result.data.UserSymptomStatistics)
        ) {
          setStudents(result.data.UserSymptomStatistics);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const translateSeverity = (level) => {
    switch (level) {
      case "very high":
      case "high":
        return { text: "Tinggi", color: "text-red-600" };
      case "intermediate":
        return { text: "Sedang", color: "text-yellow-500" };
      case "low":
      case "very low":
        return { text: "Rendah", color: "text-green-600" };
      default:
        return { text: "-", color: "text-black" };
    }
  };

  const totalPages = Math.ceil(students.length / itemsPerPage);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "next" && prev < totalPages) return prev + 1;
      if (direction === "prev" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudents = students.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center bg-white p-4 w-full">
      <h2 className="font-semibold text-lg text-slate-900 mb-4">
        Mahasiswa Yang Butuh Pertolongan Segera
      </h2>
      <h6 className="font-light text-lg text-slate-900 mb-4">
        Data mahasiswa dengan diagnosa kesehatan mental yang perlu perhatian.
      </h6>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nama</th>
              <th className="border border-gray-300 px-4 py-2">Kontak</th>
              {students.length > 0 &&
                Object.keys(students[0].symptoms || {}).map((symptom) => (
                  <th
                    key={symptom}
                    className="border border-gray-300 px-4 py-2 whitespace-nowrap"
                  >
                    {symptom}
                  </th>
                ))}
              <th className="border border-gray-300 px-4 py-2">Download</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr
                key={student.userId || index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border border-gray-300 px-4 py-2 text-black">
                  {student.userName}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-black">
                  <a href={student.contact} className="text-blue-600 underline">
                    Kontak
                  </a>
                </td>
                {Object.keys(students[0].symptoms || {}).map((symptom, i) => {
                  const severity = translateSeverity(
                    student.symptoms?.[symptom]?.level
                  );
                  return (
                    <td
                      key={i}
                      className={`border border-gray-300 px-4 py-2 text-center ${severity.color}`}
                    >
                      {severity.text}
                    </td>
                  );
                })}
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => downloadStudentExcel(student.userId)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 w-full max-w-lg">
        <button
          onClick={() => handlePageChange("prev")}
          className={`px-4 py-2 bg-blue-600 text-white rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="font-semibold text-slate-900">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          className={`px-4 py-2 bg-blue-600 text-white rounded ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
