import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import loginbg from "./assets/images/bg.jpg";
import StepPhone from "./components/login/StepPhone";
import StepOTP from "./components/login/StepOTP";
import StepRegister from "./components/login/StepRegister";
import StepTimeline from "./components/login/StepTimeline";
import ArrowRightIcon from "./assets/images/arrow-right.svg";
import CloseIcon from "./assets/images/Close-icon.svg";

const OTP_LENGTH = 5;
const COUNTDOWN_SECONDS = 120;
const toEnglishDigits = (str) =>
  String(str).replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
const stepVariants = {
  enter: (direction) => ({
    x: direction === 1 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction === 1 ? -40 : 40,
    opacity: 0,
  }),
};

export default function LoginNew() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0); // 1: جلو، -1: عقب

  // مرحله 1
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // مرحله 2
  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(""));
  const [otpError, setOtpError] = useState("");
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);

  // مرحله 3
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptRules, setAcceptRules] = useState(false);
  const [registerError, setRegisterError] = useState("");

  // وضعیت تکمیل مراحل
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [shakeStep, setShakeStep] = useState(null);

  // === اعتبارسنجی شماره ===
  const validatePhone = (value) => {
    if (!value) return "شماره موبایل را وارد کنید";
    if (!/^09\d{9}$/.test(value)) return "شماره موبایل نامعتبر است";
    return "";
  };

  // تایمر برای کد تایید
  useEffect(() => {
    if (step !== 2) return;
    if (seconds <= 0) return;

    const t = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearInterval(t);
  }, [step, seconds]);

  // تغییر Step با جهت برای انیمیشن
  const goToStep = (nextStep) => {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  // وضعیت هر مرحله برای کلیک
  const isPhoneValid = validatePhone(phone) === "";
  const canGoToStep = (targetStep) => {
    if (targetStep === 1) return true;
    if (targetStep === 2) return isPhoneValid;
    if (targetStep === 3) return isOtpVerified;
    return false;
  };

  const triggerShakeOnStep = (targetStep, message) => {
    setShakeStep(targetStep);
    if (message) {
      toast.error(message);
    }
    setTimeout(() => {
      setShakeStep(null);
    }, 400);
  };

  const handleStepClick = (targetStep) => {
    if (targetStep === step) return;

    if (canGoToStep(targetStep)) {
      goToStep(targetStep);
      return;
    }

    if (targetStep === 2) {
      triggerShakeOnStep(2, "ابتدا شماره موبایل معتبر را وارد کنید");
    } else if (targetStep === 3) {
      triggerShakeOnStep(3, "ابتدا کد تأیید را به‌درستی وارد و تایید کنید");
    } else {
      triggerShakeOnStep(targetStep);
    }
  };

  // هندل شماره موبایل
  const handlePhoneChange = (value) => {
    const english = toEnglishDigits(value);
    const onlyDigits = english.replace(/\D/g, "");
    setPhone(onlyDigits);
    if (phoneError) {
      setPhoneError(validatePhone(onlyDigits));
      toast.error("شماره موبایل نامعتبر است");
    }
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const err = validatePhone(phone);
    if (err) {
      toast.error("شماره موبایل نامعتبر است");
      return;
    }
    setPhoneError("");
    setIsOtpVerified(false);
    goToStep(2);
    setSeconds(COUNTDOWN_SECONDS);
    setOtpValues(Array(OTP_LENGTH).fill(""));
    setOtpError("");
  };

  const handleOtpChange = (index, value) => {
    if (Array.isArray(value)) {
      setOtpValues(value);
      setOtpError("");
      return;
    }

    const english = toEnglishDigits(value || "");
    if (!/^\d?$/.test(english)) return;

    const newValues = [...otpValues];
    newValues[index] = english;
    setOtpValues(newValues);
    setOtpError("");
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const code = otpValues.join("");
    if (code.length !== OTP_LENGTH) {
      setOtpError(`کد ${OTP_LENGTH} رقمی را کامل وارد کنید`);
      return;
    }
    setOtpError("");
    setIsOtpVerified(true);
    goToStep(3);
  };

  const handleResendCode = () => {
    if (seconds > 0) return;
    setSeconds(COUNTDOWN_SECONDS);
    setOtpValues(Array(OTP_LENGTH).fill(""));
    setIsOtpVerified(false);
  };

  // ثبت‌نام
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterError("");

    if (!fullName.trim()) {
      toast.error("نام و نام خانوادگی را وارد کنید");
      setTimeout(() => {
      }, 2000);      
      return;
    }
    const phoneErr = validatePhone(phone);
    if (phoneErr) {
      toast.error("شماره موبایل نامعتبر است");
      setTimeout(() => {
      }, 2000);
      return;
    }
    if (!acceptRules) {
      toast.error("باید قوانین و مقررات را بپذیرید");
      setTimeout(() => {
      }, 2000);
      return;
    }

    toast.success("ثبت نام با موفقیت انجام شد");
    setTimeout(() => {
    }, 2500);
  };

  // برگشت (موبایل)
  const handleBackMobile = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => Math.max(1, s - 1));
    } else {
      navigate(-1);
    }
  };

  // بستن (موبایل)
  const handleCloseMobile = () => {
    navigate(-1);
  };

  return (
    <div
      className="relative min-h-screen flex justify-center px-4 py-6"
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      dir="rtl"
    >
      <div className="relative z-10 w-full max-w-md">
      {/* هدر موبایل */}
        <div className="md:hidden flex items-center justify-between mt-3 mx-auto" style={{ width: "348px", height: "25px" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleBackMobile();
            }}
            className="w-[26px] h-[25px] flex items-center justify-center"
          >
            <img
              src={ArrowRightIcon}
              alt="back"
              className="w-[26px] h-[25px] object-contain"
            />
          </button>

          <button
            onClick={handleCloseMobile}
            className="w-[26px] h-[25px] flex items-center justify-center"
          >
            <img
              src={CloseIcon}
              alt="close"
              className="w-[26px] h-[25px] object-contain"
            />
          </button>
        </div>



        {/* لوگو */}
        <div className="text-center mt-4 md:mt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#F5E7FF] leading-tight">
            Lornux
          </h1>
          <p className="text-gray-100 text-xs md:text-sm mt-1">
           تیم برنامه‌نویسی لرنوکس
          </p>
        </div>

        {/* کارت موبایل */}
        <div className="mt-6 bg-white/95 rounded-3xl border border-gray-100 shadow-xl px-5 py-6 md:hidden">
          <StepTimeline
            step={step}
            totalSteps={3}
            variant="mobile"
            onStepClick={handleStepClick}
            canGoToStep={canGoToStep}
            shakeStep={shakeStep}
          />

          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {step === 1 && (
                <StepPhone
                  phone={phone}
                  phoneError={phoneError}
                  onChangePhone={handlePhoneChange}
                  onSubmit={handlePhoneSubmit}
                />
              )}

              {step === 2 && (
                <StepOTP
                  otpValues={otpValues}
                  otpError={otpError}
                  seconds={seconds}
                  onChangeOtp={handleOtpChange}
                  onSubmit={handleOtpSubmit}
                  onResend={handleResendCode}
                />
              )}

              {step === 3 && (
                <StepRegister
                  fullName={fullName}
                  email={email}
                  acceptRules={acceptRules}
                  registerError={registerError}
                  onChangeFullName={setFullName}
                  onChangeEmail={setEmail}
                  onToggleRules={() => setAcceptRules((v) => !v)}
                  onSubmit={handleRegisterSubmit}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* کارت دسکتاپ */}
        <div className="hidden md:block w-full max-w-md mx-auto mt-10 bg-white border border-gray-100 shadow-xl rounded-3xl p-8">
          <StepTimeline
            step={step}
            totalSteps={3}
            variant="desktop"
            onStepClick={handleStepClick}
            canGoToStep={canGoToStep}
            shakeStep={shakeStep}
          />

          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {step === 1 && (
                <StepPhone
                  phone={phone}
                  phoneError={phoneError}
                  onChangePhone={handlePhoneChange}
                  onSubmit={handlePhoneSubmit}
                />
              )}

              {step === 2 && (
                <StepOTP
                  otpValues={otpValues}
                  otpError={otpError}
                  seconds={seconds}
                  onChangeOtp={handleOtpChange}
                  onSubmit={handleOtpSubmit}
                  onResend={handleResendCode}
                />
              )}

              {step === 3 && (
                <StepRegister
                  fullName={fullName}
                  email={email}
                  acceptRules={acceptRules}
                  registerError={registerError}
                  onChangeFullName={setFullName}
                  onChangeEmail={setEmail}
                  onToggleRules={() => setAcceptRules((v) => !v)}
                  onSubmit={handleRegisterSubmit}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
