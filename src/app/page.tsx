"use client";

import Form from "@/components/form/form";
import Input from "@/components/form/input";

const page = () => {
  return (
    <Form
      className="grid grid-cols-3 gap-5"
      onSubmit={async (data) => console.log(data)}
    >
      <Input name="name" placeHolder="Name" />
      <Input name="email" placeHolder="Email" />
      <Input name="password" placeHolder="Password" />
      <button type="submit">Submit</button>
    </Form>
  );
};

export default page;
