import { z } from "zod";
import { emailSchema, stringSchema, telephoneNumberSchema } from "./Validation";

export const SignUpSchema = z.object({
  username: stringSchema,
  email: emailSchema,
  telephoneNumber: telephoneNumberSchema,
  password: stringSchema,
});

export type SignUpForm = z.infer<typeof SignUpSchema>;

export const LoginSchema = z.object({
  username: stringSchema,
  password: stringSchema,
});

export type LoginForm = z.infer<typeof LoginSchema>;
