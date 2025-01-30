"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function DataLengkapM() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const access_token = Cookies.get("access_token");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "https://enormous-mint-tomcat.ngrok-free.app/v1/client/psychology/admin",
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
          setStudents(result.data);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-start bg-white max-w-md">
      <h2 className="font-semibold text-lg text-slate-900">
        Data Lengkap Mahasiswa
      </h2>
      {students.length > 0 ? (
        students.map((student, index) => (
          <div
            key={student.id || index}
            className="flex items-center text-slate-950 font-normal text-xl bg-slate-100 border rounded-lg shadow mt-7 px-11 py-5 w-[1480px] h-[80px]"
          >
            <h3 className="whitespace-nowrap">
              <span className="font-bold text-lg">
                {student.client?.username || "Tidak Diketahui"}
              </span>
            </h3>
            <h5 className="whitespace-nowrap ml-16">
              <span className="font-light text-lg">Email:</span>
            </h5>
            <div className="flex items-end border rounded-lg bg-slate-500 p-2 ml-10">
              <h6 className="text-slate-50 text-sm">
                {student.client?.email || "Tidak Diketahui"}
              </h6>
            </div>
            <h5 className="whitespace-nowrap ml-16">
              <span className="font-light text-lg">Gender:</span>
            </h5>
            <div className="flex items-end border rounded-lg bg-slate-500 w-44 p-2 ml-10">
              <h6 className="text-slate-50 text-sm">
                {student.client?.gender || "Tidak Diketahui"}
              </h6>
            </div>
            <div className="flex justify-between w-full ml-16">
              <a
                href={student.client?.contact || "#"}
                className="text-slate-900 underline font-light text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kontak Mahasiswa
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-slate-900 font-light text-lg mt-5">
          Tidak ada data mahasiswa.
        </p>
      )}
    </div>
  );
}
