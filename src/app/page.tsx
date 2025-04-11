"use client";

import Form from "@/components/form/form";
import Input from "@/components/form/input";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

const page = () => {
  const schema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });

  const handleSubmit = async (data: FieldValues) => {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      console.error(validationResult.error.format());
      return;
    }
    console.log(data);
  };
  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  return (
    <Form
      className="grid grid-cols-3 gap-5"
      schema={schema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    >
      <Input name="name" placeHolder="Name" />
      <Input name="email" placeHolder="Email" />
      <Input name="password" placeHolder="Password" />
      <button type="submit">Submit</button>
    </Form>
  );
};

export default page;
