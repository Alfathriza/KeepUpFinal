"use client"; // Menandakan ini adalah komponen client

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Library untuk mengelola cookie, pastikan sudah diinstall: npm install js-cookie
import Image from "next/image"; // Import Image from next/image for optimization

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Untuk menampilkan loading state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true); // Mulai loading
    setError(""); // Reset error state

    try {
      // Kirim request login dengan credentials untuk mendapatkan refresh token di cookie
      const response = await fetch("https://enormous-mint-tomcat.ngrok-free.app/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Mengirim cookie bersama request
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Jika login berhasil
        console.log("Login successful", data);

        // Simpan access token di cookie (jika diberikan di response body)
        Cookies.set("access_token", data.data.access_token, { expires: 1 }); // 1 hari masa berlaku

        if (data.data.isAdmin) {
          router.push("/Admin/dashboard");
        } else {
          router.push("/SuperAdmin/dashboard");
        }
        // Redirect ke dashboard
      } else {
        // Tampilkan pesan error jika login gagal
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Loading selesai
    }
  };

  const handleSignUpClick = () => {
    // Arahkan pengguna ke halaman SignUp
    router.push("/User/signup");
  };

  return (
    <div className="h-screen w-full bg-blue-700 flex justify-center items-center">
      <div className="w-full tablet:w-1/2 p-10 tablet:px-36 bg-blue-700 flex flex-col gap-8 text-white">
        <div>
          <div className="flex gap-7 justify-center tablet:hidden">
            <Image className="w-24 h-auto object-contain" src="/img/keepup.png" alt="Keepup Logo" width={100} height={100} />
            <Image className="w-10 h-auto object-contain" src="/img/upw.png" alt="Upw Logo" width={40} height={40} />
            <Image className="w-20" src="/img/Logo-UII-White.png" alt="UII Logo" width={80} height={80} />
          </div>
        </div>

        <hr className="opacity-30 tablet:hidden"></hr>

        <div className="text-white text-3xl tablet:text-4xl font-bold tablet:flex tablet:justify-between text-center tablet:text-start">
          Welcome Back! <br /> Please Sign In
          <Image className="w-20 h-auto object-contain hidden tablet:flex" src="/img/upw.png" alt="Upw Logo" width={40} height={40} />
        </div>

        <div className="w-full flex flex-col gap-6">
          <input type="email" placeholder="Email Address" className="p-2.5 bg-transparent text-white text-sm focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="p-2.5 bg-transparent text-white text-sm focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <div className="text-red-500">{error}</div>}

          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-3 bg-white text-blue-700 rounded-3xl transition-transform duration-150 transform active:scale-105"
            disabled={loading} // Disable tombol saat loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <hr className="opacity-30 tablet:hidden"></hr>

          {/* Opsi Sign Up */}
          <div className="text-center mt-4">
            <span className="text-sm">
              Don&apos;t have an account?{" "}
              <button onClick={handleSignUpClick} className="text-white underline">
                Sign up Here
              </button>
            </span>
          </div>
        </div>
      </div>

      <div className="hidden tablet:flex tablet:flex-col bg-white w-1/2 h-screen justify-center items-center gap-10">
        <div className="flex gap-14">
          <Image className="w-32 h-auto object-contain" src="/img/keepup.png" alt="Keepup Logo" width={128} height={128} />
          <Image className="w-14 h-auto object-contain" src="/img/upb.png" alt="Upb Logo" width={56} height={56} />
          <Image className="w-24" src="/img/UII_LOGO.png" alt="UII Logo" width={96} height={96} />
        </div>

        <Image className="object-contain max-w-[80%] max-h-[80%] mx-auto" src="/img/Mind map-pana (1) 1.png" alt="Mind map image" width={800} height={600} />
      </div>
    </div>
  );
}
