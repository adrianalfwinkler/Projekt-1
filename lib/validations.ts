import { z } from "zod";

export const onboardingSchema = z.object({
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  hoursPerDay: z.string().min(1, "Select available hours"),
  budget: z.string().min(1, "Select your budget"),
  monthlyIncomeGoal: z.string().min(1, "Select income goal"),
  businessModel: z.string().min(1, "Select business model"),
  riskTolerance: z.string().min(1, "Select risk tolerance"),
});

export const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
});

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
});
