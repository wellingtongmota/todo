import { z } from "zod"

export const SignUpSchema = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório" })
    .min(1, "Nome é obrigatório"),
  email: z
    .string({ required_error: "E-mail é obrigatório" })
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido"),
  password: z
    .string({ required_error: "Senha é obrigatória" })
    .min(1, "Senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(32, "A senha deve ter menos de 32 caracteres")
})

export const SignInSchema = z.object({
  email: z
    .string({ required_error: "E-mail é obrigatório" })
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido"),
  // password: z
  // .string()
  // .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
  // .regex(/[a-z]/, {
  //   message: "A senha deve conter pelo menos uma letra minúscula."
  // })
  // .regex(/[A-Z]/, {
  //   message: "A senha deve conter pelo menos uma letra maiúscula."
  // })
  // .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." })
  // .regex(/[\W_]/, {
  //   message: "A senha deve conter pelo menos um caractere especial."
  // }),
  password: z
    .string({ required_error: "Senha é obrigatória" })
    .min(1, "Senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(32, "A senha deve ter menos de 32 caracteres")
})

export const NewPasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Senha é obrigatória" })
      .min(1, "Senha é obrigatória")
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .max(32, "A senha deve ter menos de 32 caracteres"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem."
  })
