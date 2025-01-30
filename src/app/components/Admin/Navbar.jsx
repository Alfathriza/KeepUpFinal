"use client"
import React from "react";
import { Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

export default function Navbar() {
  const pathname = usePathname(); // Get current path

  return (
    <nav className="flex items-center justify-between bg-white text-slate-900 h-20 px-7 fixed top-0 w-full z-10 shadow-md">
      <div className="max-w-screen-xl flex items-center w-full">
        {/* Logo */}
        <div className="flex items-start space-x-6">
          <img
            src="/img/keepup.png"
            className="h-10 w-16"
            alt="Emindlog Logo"
          />
          <img src="/img/UII_LOGO.png" className="h-13 w-16" alt="UII Logo" />
        </div>

        {/* Navigation Links */}
        <div className="flex-grow flex justify-center ml-20">
          <ul className="font-semibold flex flex-row space-x-12">
            <li>
              <Link href="/Admin/dashboard" legacyBehavior>
                <a
                  className={`block py-2 px-3 rounded transition duration-300 ${
                    pathname === "/Admin/dashboard"
                      ? "text-white bg-blue-700 hover:bg-blue-600"
                      : "text-gray-900 hover:bg-gray-100 hover:text-blue-700"
                  }`}
                >
                  Dashboard
                </a>
              </Link>
            </li>
            <li>
              <Link href="/Admin/Mahasiswa" legacyBehavior>
                <a
                  className={`block py-2 px-3 rounded transition duration-300 ${
                    pathname === "/Admin/Mahasiswa"
                      ? "text-white bg-blue-700 hover:bg-blue-600"
                      : "text-gray-900 hover:bg-gray-100 hover:text-blue-700"
                  }`}
                >
                  Mahasiswa
                </a>
              </Link>
            </li>
            <li>
              <Link href="/Admin/laporan" legacyBehavior>
                <a
                  className={`block py-2 px-3 rounded transition duration-300 ${
                    pathname === "/Admin/laporan"
                      ? "text-white bg-blue-700 hover:bg-blue-600"
                      : "text-gray-900 hover:bg-gray-100 hover:text-blue-700"
                  }`}
                >
                  Laporan
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Settings */}
      <div className="flex items-center mr-13">
        <h5 className="font-normal text-slate-950 flex items-center mr-3">
          Hello <span className="font-semibold ml-1">Admin</span>
          <Settings className="ml-2 h-5 w-5" />
        </h5>
      </div>
    </nav>
  );
}
