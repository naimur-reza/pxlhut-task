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
          {label && (
            <label className="text-sm font-medium text-muted-foreground">
              {label}
            </label>
          )}
          <input
            type={type}
            {...field}
            placeholder={placeHolder}
            className={clsx(
              "w-full px-4 py-2.5 rounded-xl text-sm shadow-sm transition-all duration-200 ease-in-out",
              "bg-background text-foreground placeholder:text-muted-foreground",
              "border focus:outline-none focus:ring-2",
              error
                ? "border-error focus:ring-error/30"
                : "border-border hover:border-border-hover focus:border-primary focus:ring-primary/30"
            )}
          />
          {error && (
            <span className="text-error text-xs font-medium">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default Input;
