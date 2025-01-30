"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function TableMahasiswa() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          "https://enormous-mint-tomcat.ngrok-free.app/v1/statistik/psychology/user",
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
          console.log("API Data:", result.data.UserSymptomStatistics); // Debug API data
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-start bg-white max-w-md">
      <h2 className="font-semibold text-lg text-slate-900">
        Mahasiswa Yang Butuh Pertolongan Segera
      </h2>
      <h6 className="font-light text-lg text-slate-900 whitespace-nowrap mt-2">
        Mahasiswa dibawah ini terindikasi memiliki kesehatan mental dan
        membutuhkan tindakan segera
      </h6>

      {students.length > 0 ? (
        students.map((student, index) => (
          <div
            key={student.userId || index}
            className="flex items-center text-slate-950 font-normal text-xl bg-slate-100 border rounded-lg shadow mt-7 px-11 py-5 w-[1480px] h-[80px]"
          >
            <h3 className="whitespace-nowrap">
              <span className="font-bold text-lg">{student.userName}</span>
            </h3>
            <h5 className="whitespace-nowrap ml-16">
              <span className="font-light text-lg">Mengalami:</span>
            </h5>
            {student.symptoms &&
              Object.entries(student.symptoms).map(
                ([symptomName, symptomDetails]) => {
                  // Process the symptoms directly
                  let severityColor;
                  let severityText;

                  switch (symptomDetails.level) {
                    case "normal":
                      severityColor = null; // Exclude "normal"
                      severityText = null;
                      break;
                    case "very low":
                    case "low":
                      severityColor = "#6c757d"; // Gray for low and very low
                      severityText = "Rendah";
                      break;
                    case "intermediate":
                      severityColor = "#ffc107"; // Yellow for intermediate
                      severityText = "Sedang";
                      break;
                    case "high":
                    case "very high":
                      severityColor = "#dc3545"; // Red for high and very high
                      severityText = "Tinggi";
                      break;
                    default:
                      severityColor = "#17a2b8"; // Blue for undefined or other states
                      severityText = "Ringan";
                  }

                  if (!severityColor) {
                    return null; // Skip normal conditions
                  }

                  return (
                    <div
                      key={symptomName}
                      className="flex items-end border rounded-lg p-2 ml-10 whitespace-nowrap"
                      style={{ backgroundColor: severityColor }}
                    >
                      <h6 className="text-slate-50 text-sm">{symptomName}</h6>
                    </div>
                  );
                }
              )}

            <div className="flex justify-between w-full ml-16">
              <a
                href={student.contact}
                className="text-slate-900 underline font-light text-sm"
              >
                Kontak Mahasiswa
              </a>
              <button
                onClick={() => downloadStudentExcel(student.userId)}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500 transition text-sm"
              >
                Download Excel
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-slate-900 font-light text-lg mt-5">
          Tidak ada mahasiswa yang membutuhkan pertolongan segera.
        </p>
      )}
    </div>
  );
}
