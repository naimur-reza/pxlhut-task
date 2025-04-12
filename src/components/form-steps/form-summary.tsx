"use client";

import { useFormContext } from "react-hook-form";
import type { FormData } from "../multi-step-form";

export default function FormSummary() {
  const { getValues } = useFormContext<FormData>();
  const values = getValues();

  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Full Name", value: values.name },
        { label: "Email", value: values.email },
        { label: "Phone Number", value: values.phone },
      ],
    },
    {
      title: "Address Details",
      fields: [
        { label: "Street Address", value: values.street },
        { label: "City", value: values.city },
        { label: "State", value: values.state },
        { label: "Zip Code", value: values.zip },
      ],
    },
    {
      title: "Account Setup",
      fields: [
        { label: "Username", value: values.userName },
        { label: "Password", value: "••••••" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Review Your Information
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Please review your information before submitting the form.
      </p>

      {sections.map((section, index) => (
        <div key={index} className="border rounded-lg p-4 dark:border-gray-700">
          <h3 className="font-medium text-gray-800 dark:text-white mb-3">
            {section.title}
          </h3>
          <div className="space-y-2">
            {section.fields.map((field, fieldIndex) => (
              <div key={fieldIndex} className="grid grid-cols-2 gap-2">
                <span className="text-gray-600 dark:text-gray-400">
                  {field.label}:
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
