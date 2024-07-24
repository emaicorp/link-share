import { z } from "zod";

// const phoneRegex = new RegExp(/^(\+?[\d\s]+)?(\d{3}|\(?\d+\))?(-?\s?\d)+$/);

export const FormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "cannot be empty" })
    .email({ message: "invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character" }),
});

export const createUserSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "cannot be empty" })
    .email({ message: "invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character" }),
    cpassword: z.string()
  }).refine((data) => data.password === data.cpassword, {
    path: ["cpassword"], // The path of the error message
    message: "Passwords don't match", // The error message
  });
  