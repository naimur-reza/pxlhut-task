"use client";

import StepIndicator from "@/components/step-indicator";
import { userSchema } from "@/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import AccountSetupForm from "./form-steps/account-setup";
import AddressForm from "./form-steps/address";
import FormSummary from "./form-steps/form-summary";
import PersonalInfoForm from "./form-steps/personal-info";

export type FormData = z.infer<typeof userSchema>;

const MultiStepForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<FormData>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, trigger, reset } = methods;

  const steps = [
    { name: "Personal Info", component: <PersonalInfoForm /> },
    { name: "Address", component: <AddressForm /> },
    { name: "Account Setup", component: <AccountSetupForm /> },
    { name: "Summary", component: <FormSummary /> },
  ];

  const submitFormData = async (data: FormData) => {
    console.log("Mock submission started with data:", data);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Mock submission completed successfully");
    return { success: true };
  };

  const mutation = useMutation({
    mutationFn: submitFormData,
    onSuccess: () => {
      console.log("Mutation succeeded, setting isSubmitted to true");
      setIsSubmitted(true);
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert("Form submission failed. Please try again.");
    },
  });

  const goToNextStep = async () => {
    const fieldsToValidate = [
      ["name", "email", "phone"],
      ["street", "city", "zip"],
      ["userName", "password", "confirmPassword"],
      [],
    ][currentStep];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isStepValid = await trigger(fieldsToValidate as any);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted, calling mutation.mutate");
    mutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-xl text-center">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Submission Successful!
        </h2>
        <p className="text-gray-600 mb-6">Thank you for completing the form.</p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setCurrentStep(0);
            reset();
          }}
          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="relative max-w-xl mx-auto mt-10">
        <div className="absolute top-2 right-2">{/* <ThemeToggle /> */}</div>

        <div className="p-6 rounded-2xl shadow-lg">
          <StepIndicator
            currentStep={currentStep}
            steps={steps.map((s) => s.name)}
          />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            {steps[currentStep].component}

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium"
                >
                  {mutation.isPending ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default MultiStepForm;
