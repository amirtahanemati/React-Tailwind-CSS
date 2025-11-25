import { useRef } from "react";

export default function StepOTP({
  otpValues,
  otpError,
  seconds,
  onChangeOtp,
  onSubmit,
  onResend,
}) {
  const inputsRef = useRef([]);

  const toPersianDigits = (num) =>
    num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `ارسال دوباره ${toPersianDigits(m)}:${toPersianDigits(s)}`;
  };

  const isOtpComplete = otpValues.every((v) => v && v.length === 1);
  const normalizeDigit = (v) =>
    v.replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);

  const handleInput = (index, value, event) => {
    let english = normalizeDigit(value);

    if (english.length > 1) {
      const arr = english.split("").slice(0, otpValues.length);
      const newOtp = [...otpValues];

      arr.forEach((d, i) => {
        if (index + i < otpValues.length) {
          newOtp[index + i] = d;
        }
      });

      onChangeOtp(-1, newOtp); // سیگنال خاص برای ست کامل
      const lastPos = Math.min(index + arr.length - 1, otpValues.length - 1);
      inputsRef.current[lastPos]?.focus();
      return;
    }

    // *** رفتار تک کاراکتر ***
    const newOtp = [...otpValues];
    newOtp[index] = english;
    onChangeOtp(index, english);

    if (english && index < otpValues.length - 1) {
      inputsRef.current[index + 1].focus();
      inputsRef.current[index + 1].select?.();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      if (!otpValues[index] && index > 0) {
        inputsRef.current[index - 1].focus();
        const newOtp = [...otpValues];
        newOtp[index - 1] = "";
        onChangeOtp(index - 1, "");
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h2 className="text-right text-lg md:text-xl font-bold text-[#222]">
        کد تایید را وارد کنید
      </h2>

      <div className="flex justify-center gap-2 md:gap-3" dir="ltr">
        {otpValues.map((val, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            ref={(el) => (inputsRef.current[index] = el)}
            value={toPersianDigits(val || "")}
            dir="ltr"
            style={{ direction: "ltr", textAlign: "center" }}
            className="w-10 h-12 md:w-12 md:h-14 rounded-lg border border-gray-300 
                       text-lg text-gray-800 focus:outline-none focus:ring-2 
                       focus:ring-[#D63C70] focus:border-[#A3287A]"
            onKeyDown={(e) => handleKeyDown(index, e)}
            onChange={(e) => handleInput(index, e.target.value, e)}
            onPaste={(e) => {
              e.preventDefault();
              handleInput(index, e.clipboardData.getData("text"), e);
            }}
          />
        ))}
      </div>

      {otpError && (
        <p className="text-red-500 text-[11px] md:text-xs text-center">
          {otpError}
        </p>
      )}

      <div className="flex items-center justify-between text-[11px] md:text-xs text-gray-500">
        <span>کد برای شما ارسال شد</span>
        {seconds > 0 ? (
          <span className="text-gray-400">{formatTime(seconds)}</span>
        ) : (
          <button
            type="button"
            onClick={onResend}
            className="text-[#D63C70] hover:text-[#A3287A] font-medium"
          >
            ارسال دوباره
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={!isOtpComplete}
        className={`w-full rounded-2xl py-3 text-sm md:text-base font-bold transition ${
          isOtpComplete
            ? "bg-[#D63C70] hover:bg-[#A3287A] text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      > 
        ثبت‌
      </button>
    </form>
  );
}
