"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function TableAdmin() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const access_token = Cookies.get("access_token");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(
          "https://enormous-mint-tomcat.ngrok-free.app/v1/psychology",
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
          setAdmins(result.data);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-start bg-white max-w-md">
      <h2 className="font-semibold text-lg text-slate-900 mt-12">
        Data Lengkap Admin
      </h2>
      

      {admins.length > 0 ? (
        admins.map((admin, index) => (
          <div
            key={admin.id || index}
            className="flex items-center text-slate-950 font-normal text-xl bg-slate-100 border rounded-lg shadow mt-7 px-11 py-5 w-[1480px] h-[80px]"
          >
            <h3 className="whitespace-nowrap">
              <span className="font-bold text-lg">{admin.username}</span>
            </h3>
            <h5 className="whitespace-nowrap ml-16">
              <span className="font-light text-lg">Email:</span>
            </h5>
            <div className="flex items-end border rounded-lg bg-slate-500 p-2 ml-10 whitespace-nowrap">
              <h6 className="text-slate-50 text-sm">{admin.email}</h6>
            </div>
            <h5 className="whitespace-nowrap ml-16">
              <span className="font-light text-lg">Role:</span>
            </h5>
            <div className="flex items-end border rounded-lg bg-slate-500 p-2 ml-10 whitespace-nowrap">
              <h6 className="text-slate-50 text-sm">{admin.role || "Admin"}</h6>
            </div>
            <div className="flex justify-between w-full ml-16">
              <a
                href="#"
                className="text-slate-900 underline font-light text-sm"
              >
                Kontak Admin
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-slate-900 font-light text-lg mt-5">
          Tidak ada data admin yang ditemukan.
        </p>
      )}
    </div>
  );
}
