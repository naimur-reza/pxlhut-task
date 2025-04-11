"use client";

import { Controller, useFormContext } from "react-hook-form";

const Input = ({
  name,
  placeHolder,
}: {
  name: string;
  placeHolder?: string;
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <input
            className="w-full px-4 py-2.5 bg-white dark:bg-gray-950 border  dark:border-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-white/20 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 text-sm text-gray-900 dark:text-white transition"
            {...field}
            placeholder={placeHolder}
          />
          {error && (
            <span className="text-red-500/95 text-xs ">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default Input;
