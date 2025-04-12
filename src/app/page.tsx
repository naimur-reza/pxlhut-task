import MultiStepForm from "@/components/multi-step-form";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 ">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">Registration</h1>
        <MultiStepForm />
      </div>
    </main>
  );
}
