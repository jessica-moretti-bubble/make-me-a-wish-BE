import { createRoute, z } from "@hono/zod-openapi";
import { register, login } from "../controllers/auth.controller.js";
import {
  RegisterSchema,
  LoginSchema,
  TokenResponseSchema,
} from "../schemas/auth/auth.openapi.schema.js";

const registerRoute = createRoute({
  method: "post",
  path: "/auth/register",
  request: {
    body: {
      content: {
        "application/json": {
          schema: RegisterSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Utente creato",
    },
  },
});

const loginRoute = createRoute({
  method: "post",
  path: "/auth/login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: LoginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Token JWT",
      content: {
        "application/json": {
          schema: TokenResponseSchema,
        },
      },
    },
  },
});

export const registerAuthRoutes = (app: any) => {
  app.openapi(registerRoute, register);
  app.openapi(loginRoute, login);
};
