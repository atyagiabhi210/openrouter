import { email, z } from "zod";
export const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const signInResponseSchema = z.object({
  token: z.string(),
  email: z.string(),
  id: z.number(),
});

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const signUpResponseSchema = z.object({
  token: z.string(),
  email: z.string(),
  id: z.number(),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInResponse = z.infer<typeof signInResponseSchema>;
export type SignUpResponse = z.infer<typeof signUpResponseSchema>;
