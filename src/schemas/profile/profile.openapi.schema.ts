import { z } from "@hono/zod-openapi";

export const ProfileOpenapiSchema = z.object({
  name: z.string().openapi({
    example: "Mario",
    description: "The user's name",
  }),
  surname: z.string().openapi({
    example: "Rossi",
    description: "The user's surname",
  }),
  username: z.string().optional().openapi({
    example: "nevromantik",
    description: "The user's username",
  }),
});

export const ProfileConfirmationOpenapiSchema = z.object({
  username: z.string().openapi({
    example: "nevromantik",
    description: "The username",
  }),
});
