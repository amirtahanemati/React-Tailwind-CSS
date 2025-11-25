const toPersianDigits = (str) =>
  str.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

export default function StepPhone({ phone, phoneError, onChangePhone, onSubmit }) {
  return (
    <>
      <form onSubmit={onSubmit} className="space-y-5">
        <h2 className="text-ri text-lg md:text-xl pb-2 font-bold text-[#222]">
          ورود | ثبت‌نام
        </h2>

        <div className="space-y-1.5">
          <label className="block text-xs md:text-sm text-gray-600">
            لطفا شماره موبایل خود را وارد کنید.
          </label>

          <div className="relative flex items-center">
            <input
              type="tel"
              maxLength={11}
              value={toPersianDigits(phone || "")}
              onChange={(e) => onChangePhone(e.target.value)}
              placeholder="مثلاً ۰۹۱۲۳۴۵۶۷۸۹"
              className="w-full rounded-2xl text-[#222] border border-gray-300 px-3 py-3 text-sm md:text-base outline-none text-right"
            />

            {phone && (
              <button
                type="button"
                onClick={() => onChangePhone("")}
                className="absolute left-3 text-gray-400 text-xl leading-none"
              >
                ×
              </button>
            )}
          </div>

          {phoneError && (
            <p className="text-red-500 text-[11px] md:text-xs mt-1">
              {phoneError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-[#D63C70] hover:bg-[#A3287A] text-white py-3 text-sm md:text-base font-bold transition"
        >
          ادامه
        </button>
      </form>
    </>
  );
}
