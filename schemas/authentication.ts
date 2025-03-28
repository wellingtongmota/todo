import { z } from "zod"

export const NameSchema = z
  .string({ required_error: "Name is required" })
  .min(1, "Name is required")

export const EmailSchema = z
  .string({ required_error: "Email is required" })
  .min(1, "Email is required")
  .email("Invalid email")

export const PasswordSchema = z
  .string({ required_error: "Password is required" })
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters long")
  .max(32, "Password must be less than 32 characters long")

export const PictureFileSchema = z
  .instanceof(File)
  .refine((file) => file.size < 4 * 1024 * 1024, {
    message: "The file must be less than 4MB"
  })
  .optional()

export const UpdateUserSchema = z.object({
  name: NameSchema,
  image: PictureFileSchema
})

export const SignUpSchema = z.object({
  name: NameSchema,
  email: EmailSchema,
  password: PasswordSchema,
  image: PictureFileSchema
})

export const SignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema
})

export const ForgotPasswordSchema = z.object({
  email: EmailSchema
})

export const ChangePasswordSchema = z.object({
  newPassword: PasswordSchema,
  currentPassword: PasswordSchema
})

export const ResetPasswordSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match."
  })
