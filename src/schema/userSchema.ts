import { z } from "zod";

// Step 1: Personal Information Schema
const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

// Step 2: Address Schema
const addressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  zip: z
    .string()
    .min(5, "ZIP code must be at least 5 characters")
    .regex(/^\d+$/, "ZIP code must contain only digits"),
});

// Step 3: Account Setup Schema - without refine
const accountSetupBaseSchema = z.object({
  userName: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
});

// Step 3: Account Setup Schema - with refine for step 3
const accountSetupSchema = accountSetupBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

// Complete User Schema (combines all steps)
export const userSchema = personalInfoSchema
  .merge(addressSchema)
  .merge(accountSetupBaseSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Export individual step schemas for step-specific validation
export const stepSchemas = [
  personalInfoSchema,
  addressSchema,
  accountSetupSchema,
  userSchema, // Full schema for the summary step
];
