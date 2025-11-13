import { z } from "@hono/zod-openapi";

export const RegisterSchema = z.object({
  email: z.email().openapi({
    example: "jess@example.com",
    description: "The user's email",
  }),

  password: z.string().min(8).openapi({
    example: "Ciaociao123",
    description: "The user's password",
  }),
  name: z.string().openapi({
    example: "Mario",
    description: "The user's name",
  }),
  surname: z.string().openapi({
    example: "Rossi",
    description: "The user's surname",
  }),
});

export const LoginSchema = z.object({
  email: z.email().openapi({ example: "jess@example.com" }),
  password: z.string().min(8).openapi({ example: "Ciaociao123" }),
});

export const TokenResponseSchema = z.object({
  token: z.string().openapi({ example: "eyJhbGciOi..." }),
  profileIsCompleted: z
    .boolean()
    .openapi({ description: "it indicates if there is username" }),
});
