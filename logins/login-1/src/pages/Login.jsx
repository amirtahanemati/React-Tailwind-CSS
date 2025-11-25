import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import GoogleLogo from "../assets/logo/google.png";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#FAEBD7", direction: "rtl" }}
    >
      {/* Card */}
      <div
        className="w-full max-w-md p-8 rounded-2xl shadow-xl"
        style={{ backgroundColor: "#2F4F4F" }}
      >
        {/* Title */}
        <h1
          className="text-center text-3xl font-extrabold mb-6"
          style={{ color: "#DAA520" }}
        >
          ورود به حساب
        </h1>

        <form className="flex flex-col gap-6">

          {/* Email */}
          <div className="relative">
            <EnvelopeIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5"
              style={{ color: "#DAA520" }}
            />

            <input
              type="email"
              className="w-full py-3 pr-10 pl-4 rounded-xl bg-transparent border outline-none focus:ring-2 focus:ring-[#DAA520] transition"
              placeholder="ایمیل (پست الکترونیک)"
              style={{
                borderColor: "white",
                color: "white",
              }}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <LockClosedIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5"
              style={{ color: "#DAA520" }}
            />

            <input
              type={showPassword ? "text" : "password"}
              className="w-full py-3 pr-10 pl-10 rounded-xl bg-transparent border outline-none focus:ring-2 focus:ring-[#DAA520] transition"
              placeholder="رمز عبور"
              style={{
                borderColor: "white",
                color: "white",
              }}
            />

            {/* Show / Hide */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5" style={{ color: "#DAA520" }} />
              ) : (
                <EyeIcon className="h-5" style={{ color: "#DAA520" }} />
              )}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold transition hover:scale-[1.02] shadow-lg"
            style={{
              backgroundColor: "#DAA520",
              color: "#2F4F4F",
            }}
          >
            ورود
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="h-px bg-white/30 flex-grow"></div>
            <span className="text-gray-300 text-sm">یا</span>
            <div className="h-px bg-white/30 flex-grow"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full py-3 rounded-xl border flex items-center justify-center gap-2 transition hover:bg-white/10"
            style={{
              borderColor: "white",
              color: "white",
            }}
          >
          <img src={GoogleLogo} alt="google" className="h-5" />

            ورود با گوگل
          </button>
        </form>

        {/* Register link */}
        <p className="text-center mt-6">
        <span style={{ color: "white" }}>حساب کاربری نداری؟ </span>
        <a href="/register" style={{ color: "#DAA520" }} className="hover:opacity-80 transition">
            ثبت‌نام کن !
        </a>
        </p>
      </div>
    </div>
  );
}
