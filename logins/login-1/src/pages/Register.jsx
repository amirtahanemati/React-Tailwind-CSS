import { useState } from "react";
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#FAEBD7", direction: "rtl" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl shadow-xl"
        style={{ backgroundColor: "#2F4F4F" }}
      >
        {/* Title */}
        <h1
          className="text-center text-3xl font-extrabold mb-6"
          style={{ color: "#DAA520" }}
        >
          ایجاد حساب کاربری
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-6">

          {/* Full Name */}
          <div className="relative">
            <UserIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5"
              style={{ color: "#DAA520" }}
            />

            <input
              type="text"
              className="w-full py-3 pr-10 pl-4 rounded-xl bg-transparent border outline-none focus:ring-2 focus:ring-[#DAA520] transition"
              placeholder="نام و نام خانوادگی"
              style={{
                borderColor: "white",
                color: "white",
              }}
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <PhoneIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5"
              style={{ color: "#DAA520" }}
            />

            <input
              type="text"
              className="w-full py-3 pr-10 pl-4 rounded-xl bg-transparent border outline-none focus:ring-2 focus:ring-[#DAA520] transition"
              placeholder="شماره موبایل"
              style={{
                borderColor: "white",
                color: "white",
              }}
            />
          </div>

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
              type={showPass ? "text" : "password"}
              className="w-full py-3 pr-10 pl-10 rounded-xl bg-transparent border outline-none focus:ring-2 focus:ring-[#DAA520] transition"
              placeholder="رمز عبور"
              style={{
                borderColor: "white",
                color: "white",
              }}
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            >
              {showPass ? (
                <EyeSlashIcon className="h-5" style={{ color: "#DAA520" }} />
              ) : (
                <EyeIcon className="h-5" style={{ color: "#DAA520" }} />
              )}
            </button>
          </div>

          {/* Repeat Password */}
          <div className="relative">
            <LockClosedIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5"
              style={{ color: "#DAA520" }}
            />

            <input
              type={showRepeatPass ? "text" : "password"}
              className="w-full py-3 pr-10 pl-10 rounded-xl bg-transparent border outline-none focus:ring-2 focus:ring-[#DAA520] transition"
              placeholder="تکرار رمز عبور"
              style={{
                borderColor: "white",
                color: "white",
              }}
            />

            <button
              type="button"
              onClick={() => setShowRepeatPass(!showRepeatPass)}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            >
              {showRepeatPass ? (
                <EyeSlashIcon className="h-5" style={{ color: "#DAA520" }} />
              ) : (
                <EyeIcon className="h-5" style={{ color: "#DAA520" }} />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold transition hover:scale-[1.02] shadow-lg"
            style={{
              backgroundColor: "#DAA520",
              color: "#2F4F4F",
            }}
            onClick={(e) => e.preventDefault()} // فعلاً
          >
            ثبت‌نام
          </button>
        </form>

        {/* Back to login */}
        <p className="text-center mt-6">
          <span style={{ color: "white" }}>حساب کاربری داری؟ </span>
          <a
            href="/"
            style={{ color: "#DAA520" }}
            className="hover:opacity-80 transition"
          >
            وارد شو !
          </a>
        </p>
      </div>
    </div>
  );
}
