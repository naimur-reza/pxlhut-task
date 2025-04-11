export default function StepIndicator({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: string[];
}) {
  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              index <= currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
            }`}
          >
            {index + 1}
          </div>
          <span
            className={`mt-2 text-xs ${
              index <= currentStep
                ? "text-gray-800 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`absolute h-[2px] w-[calc(100%/${
                steps.length - 1
              }-2rem)] ${
                index < currentStep
                  ? "bg-primary"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
              style={{
                left: `calc(${index * (100 / (steps.length - 1))}% + 1rem)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
