"use client";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Cookies from "js-cookie";

export default function FacultyMajorPieChart() {
  const [faculties, setFaculties] = React.useState([]);
  const [selectedFaculty, setSelectedFaculty] = React.useState(null);
  const [majorData, setMajorData] = React.useState([]);

  const access_token = Cookies.get("access_token");

  // Fetch faculties
  React.useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch(
          "https://enormous-mint-tomcat.ngrok-free.app/v1/faculty",
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
          setFaculties(result.data);
        }
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, []);

  // Fetch majors for a selected faculty
  const fetchMajors = async (facultyId) => {
    try {
      const response = await fetch(
        `https://enormous-mint-tomcat.ngrok-free.app/v1/statistik/superAdmin/user/${facultyId}`,
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
        const formattedData = result.data.map((major) => ({
          id: major.majorId,
          value: major.userDoneKuisioner,
          label: major.majorName,
        }));
        setMajorData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching majors:", error);
    }
  };

  // Handle faculty selection
  const handleFacultyChange = (event) => {
    const facultyId = event.target.value;
    setSelectedFaculty(facultyId);
    fetchMajors(facultyId);
  };

  return (
    <div className="flex flex-col items-center bg-white p-4 w-full">
      <h2 className="font-semibold text-lg text-slate-900 mb-4">
        Statistik Fakultas dan Jurusan
      </h2>

      <div className="flex items-center mb-4">
        <label htmlFor="faculty-select" className="mr-4 text-slate-900">
          Pilih Fakultas:
        </label>
        <select
          id="faculty-select"
          onChange={handleFacultyChange}
          className="px-4 py-2 border text-black border-gray-300 rounded"
        >
          <option value="">-- Pilih Fakultas --</option>
          {faculties.map((faculty) => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.name}
            </option>
          ))}
        </select>
      </div>

      {majorData.length > 0 ? (
        <PieChart series={[{ data: majorData }]} width={400} height={200} />
      ) : (
        <p className="text-slate-900">
          Silakan pilih fakultas untuk melihat data jurusan.
        </p>
      )}
    </div>
  );
}
