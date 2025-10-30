import { z } from "zod";

export const step1Schema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
});

export const step2Schema = z.object({
  address: z.string().nonempty("Address is required"),
});

export const step3Schema = z.object({
  job: z.string().nonempty("Job Title is required"),
});

// Array of step schemas (for step-by-step validation)
export const stepSchema = [step1Schema, step2Schema, step3Schema] as const;

// Merge into one full schema
export const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);

// Type for the entire form
export type FormData = z.infer<typeof fullSchema>;
