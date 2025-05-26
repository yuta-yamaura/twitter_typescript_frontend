import { z } from "zod";
import { emailSchema, stringSchema, telephoneNumberSchema } from "./validation";

export const SignUpSchema = z.object({
  username: stringSchema,
  email: emailSchema,
  telephoneNumber: telephoneNumberSchema,
  password: stringSchema,
});

export type SignUpForm = z.infer<typeof SignUpSchema>;
