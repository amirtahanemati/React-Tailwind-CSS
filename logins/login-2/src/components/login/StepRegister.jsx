export default function StepRegister({
  fullName,
  email,
  acceptRules,
  registerError,
  onChangeFullName,
  onChangeEmail,
  onToggleRules,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text- text-lg md:text-xl font-bold text-[#222] mb-4">
        ثبت‌نام
      </h2>

      <div className="space-y-1.5">
        <label className="block text-xs md:text-sm text-gray-600">
          نام و نام خانوادگی *
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => onChangeFullName(e.target.value)}
          className="w-full rounded-xl text-gray-800 border border-gray-300 bg-white px-3 py-2.5 text-sm md:text-base text-right outline-none focus:ring-2 focus:ring-[#D63C70] focus:border-[#A3287A]"
          placeholder="نام خود را به فارسی وارد کنید"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs md:text-sm text-gray-600">
          ایمیل (اختیاری)
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          className="w-full rounded-xl border border-green-400 bg-green-50 px-3 py-2.5 text-sm md:text-base text-right outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
          placeholder="Example@gmail.com"
        />
      </div>

      <div className="flex items-start gap-2 text-[11px] md:text-xs mt-1">
        <input
          id="rules"
          type="checkbox"
          checked={acceptRules}
          onChange={onToggleRules}
          className="mt-0.5"
        />
        <label htmlFor="rules" className="text-gray-600">
          قوانین و{" "}
          <span className="text-blue-500 cursor-pointer">مقررات</span> را
          خوانده و قبول دارم.
        </label>
      </div>

      {registerError && (
        <p className="text-red-500 text-[11px] md:text-xs">{registerError}</p>
      )}

      <button
        type="submit"
        className="w-full rounded-2xl bg-[#D63C70] hover:bg-[#A3287A] text-white py-3 text-sm md:text-base font-bold transition"
      >
        تایید
      </button>
    </form>
  );
}
