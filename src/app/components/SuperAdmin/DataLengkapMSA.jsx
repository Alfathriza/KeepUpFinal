"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function DataLengkapM() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const access_token = Cookies.get("access_token");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "https://enormous-mint-tomcat.ngrok-free.app/v1/client/superAdmin",
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

        if (result.statusCode === 200 && Array.isArray(result.data)) {
          setStudents(result.data); // Store all data
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
        Data Lengkap Mahasiswa
      </h2>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nama</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Gender</th>
              <th className="border border-gray-300 px-4 py-2">Kontak</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr
                key={student.id || index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border border-gray-300 px-4 py-2 text-black">
                  {student.client?.username || "Tidak Diketahui"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-black">
                  {student.client?.email || "Tidak Diketahui"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-black">
                  {student.client?.gender || "Tidak Diketahui"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <a
                    href={student.client?.contact || "#"}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kontak
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 w-full max-w-lg">
        <button
          onClick={() => handlePageChange("prev")}
          className={`px-4 py-2  bg-blue-600 text-white rounded ${
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
          className={`px-4 py-2  bg-blue-600 text-white rounded ${
            currentPage < totalPages
              ? "hover:bg-gray-300"
              : "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
