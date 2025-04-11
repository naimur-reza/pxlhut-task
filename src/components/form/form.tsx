/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";

type TFormConfig = {
  schema?: z.ZodSchema<any>;
  defaultValues?: Record<string, any>;
  resolver?: any;
  isLoading?: boolean;
  className?: string;
  onSubmit?: (data: FieldValues) => void;
};

type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const Form = ({
  children,
  onSubmit,
  schema,
  defaultValues,
  className,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (schema) {
    formConfig["resolver"] = zodResolver(schema);
  }

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm({ ...formConfig, mode: "onSubmit" });
  const { handleSubmit } = methods;

  const submit: SubmitHandler<FieldValues> = async (data) => {
    await onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form className={`w-full ${className}`} onSubmit={handleSubmit(submit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
