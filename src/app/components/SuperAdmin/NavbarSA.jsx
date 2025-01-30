"use client";
import React from "react";
import Cookies from "js-cookie"; // Import js-cookie
import { useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname(); // Get current path
  const router = useRouter(); // Initialize router

  const handleLogout = () => {
    // Hapus cookie autentikasi (ganti "authToken" dengan nama cookie Anda)
    Cookies.remove("authToken");

    // Redirect ke halaman login
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-white text-slate-900 h-20 px-7 fixed top-0 w-full z-10 shadow-md">
      <div className="max-w-screen-xl flex items-center w-full">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <img src="/img/keepup.png" className="h-8 w-20" alt="Emindlog Logo" />
          <img src="/img/UII_LOGO.png" className="h-12 w-20" alt="UII Logo" />
        </div>

        {/* Navigation Links */}
        <div className="flex-grow flex justify-center ml-20">
          <ul className="font-semibold flex flex-row space-x-12">
            <li>
              <Link href="/SuperAdmin/dashboard" legacyBehavior>
                <a
                  className={`block py-2 px-3 rounded transition duration-300 ${
                    pathname === "/SuperAdmin/dashboard"
                      ? "bg-blue-700 text-white"
                      : "text-gray-900 hover:bg-blue-300 hover:text-white"
                  }`}
                >
                  Dashboard
                </a>
              </Link>
            </li>
            <li>
              <Link href="/SuperAdmin/Mahasiswa" legacyBehavior>
                <a
                  className={`block py-2 px-3 rounded transition duration-300 ${
                    pathname === "/SuperAdmin/Mahasiswa"
                      ? "bg-blue-700 text-white"
                      : "text-gray-900 hover:bg-blue-300 hover:text-white"
                  }`}
                >
                  Mahasiswa
                </a>
              </Link>
            </li>
            <li>
              <Link href="/SuperAdmin/laporan" legacyBehavior>
                <a
                  className={`block py-2 px-3 rounded transition duration-300 ${
                    pathname === "/SuperAdmin/laporan"
                      ? "bg-blue-700 text-white"
                      : "text-gray-900 hover:bg-blue-300 hover:text-white"
                  }`}
                >
                  Laporan
                </a>
              </Link>
            </li>
            <li>
              <Link href="/SuperAdmin/adminSA" legacyBehavior>
                <a
                  className={`block py-2 px-3 rounded transition duration-300 ${
                    pathname === "/SuperAdmin/adminSA"
                      ? "bg-blue-700 text-white"
                      : "text-gray-900 hover:bg-blue-300 hover:text-white"
                  }`}
                >
                  Admin
                </a>
              </Link>
            </li>
            <li>
              <Link href="/SuperAdmin/Kuisioner" legacyBehavior>
                <a
                  className={`block py-2 px-3 rounded transition duration-300 ${
                    pathname === "/SuperAdmin/Kuisioner"
                      ? "bg-blue-700 text-white"
                      : "text-gray-900 hover:bg-blue-300 hover:text-white"
                  }`}
                >
                  Kuisioner
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* LogOut Button */}
      <div className="flex items-center mr-13">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
        >
          LogOut
        </button>
      </div>
    </nav>
  );
}
