export default function StepTimeline({
  step,
  variant = "desktop",
  onStepClick,
  canGoToStep,
  shakeStep,
}) {
  const steps = [
    { id: 1, label: "ورود" },
    { id: 2, label: "کد تایید" },
    { id: 3, label: "ثبت‌نام" },
  ];

  const shakeKeyframes = `
    @keyframes stepShake {
      0% { transform: translateX(0); }
      20% { transform: translateX(-3px); }
      40% { transform(3px); }
      60% { transform(-2px); }
      80% { transform(2px); }
      100% { transform(0); }
    }
  `;

  if (variant === "mobile") {
    return (
      <div className="w-full mb-6 -mx-6 px-0">
        <style>{shakeKeyframes}</style>

        <div className="flex flex-row-reverse items-center gap-3 w-full">
          {steps.map((s, index) => {
            const isActive = s.id === step;
            const isCompleted = s.id < step;
            const isLast = index === steps.length - 1;
            const isEnabled = canGoToStep ? canGoToStep(s.id) : false;

            return (
              <div
                key={s.id}
                className={`flex items-center gap-1 flex-row-reverse flex-1 
                  ${isEnabled || isActive ? "cursor-pointer" : "cursor-default"}
                `}
                onClick={() => {
                  if (onStepClick) onStepClick(s.id);
                }}
              >
                <div className="flex flex-col items-center gap-1 min-w-[40px]">
                  <div
                    style={
                      shakeStep === s.id
                        ? { animation: "stepShake 0.35s" }
                        : undefined
                    }
                    className={`w-2.5 h-2.5 rounded-full border transition-all duration-300
                      ${
                        isActive
                          ? "bg-[#D63C70] border-[#D63C70] shadow-md scale-110"
                          : isCompleted
                          ? "bg-[#A3287A33] border-[#A3287A]"
                          : "bg-gray-200 border-gray-300"
                      }`}
                  />
                  <span
                    className={`text-[10px] ${
                      isActive
                        ? "text-[#D63C70] font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>

                {!isLast && (
                  <div
                    className={`flex-1 h-0.5 rounded-full transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-[#A3287A]"
                          : step > s.id
                          ? "bg-[#A3287A33]"
                          : "bg-gray-200"
                      }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-6 -mx-4 md:-mx-8 px-4 md:px-8">
      <style>{shakeKeyframes}</style>
      <div className="flex flex-row-reverse items-center gap-2 w-full">
        {steps.map((s, index) => {
          const isActive = s.id === step;
          const isCompleted = s.id < step;
          const isLast = index === steps.length - 1;
          const isEnabled = canGoToStep ? canGoToStep(s.id) : false;

          return (
            <div
              key={s.id}
              className={`flex items-center gap-2 flex-row-reverse flex-1 ${
                isEnabled || isActive ? "cursor-pointer" : "cursor-default"
              }`}
              onClick={() => {
                if (onStepClick) {
                  onStepClick(s.id);
                }
              }}
            >
              <div className="flex flex-col items-center gap-1 min-w-[52px]">
                <div
                  style={
                    shakeStep === s.id
                      ? { animation: "stepShake 0.35s" }
                      : undefined
                  }
                  className={`w-3 h-3 rounded-full border transition-all duration-300
                    ${
                      isActive
                        ? "bg-[#D63C70] border-[#D63C70] shadow-md scale-110"
                        : isCompleted
                        ? "bg-[#A3287A33] border-[#A3287A]"
                        : "bg-gray-200 border-gray-300"
                    }`}
                />
                <span
                  className={`text-[11px] ${
                    isActive
                      ? "text-[#D63C70] font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {s.label}
                </span>
              </div>

              {!isLast && (
                <div
                  className={`flex-1 h-0.5 rounded-full transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-[#A3287A]"
                        : step > s.id
                        ? "bg-[#A3287A33]"
                        : "bg-gray-200"
                    }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
