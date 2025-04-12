"use client";

import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";

const Input = ({
  name,
  placeHolder,
  type = "text",
  label,
}: {
  name: string;
  placeHolder?: string;
  type?: string;
  label?: string;
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-1">
          {label && <label className="text-sm font-medium">{label}</label>}
          <input
            type={type}
            {...field}
            placeholder={placeHolder}
            className={clsx(
              "w-full px-4 py-2.5 rounded-xl shadow-sm text-sm transition focus:outline-none focus:ring-2",
              "bg-white dark:bg-gray-950",
              "text-gray-900 dark:text-white",
              "placeholder-gray-400 dark:placeholder-gray-500",
              error
                ? "border border-red-500 focus:ring-red-400"
                : "border border-gray-200 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
            )}
          />
          {error && (
            <span className="text-red-500 text-xs font-medium">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default Input;
