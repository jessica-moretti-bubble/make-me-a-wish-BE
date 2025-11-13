import { createRoute, z } from "@hono/zod-openapi";
import { jwtAuth } from "../middleware/auth.js";
import {
  confirmProfile,
  getProfile,
} from "../controllers/profile.controller.js";
import {
  ProfileConfirmationOpenapiSchema,
  ProfileOpenapiSchema,
} from "../schemas/profile/profile.openapi.schema.js";

const getProfileRoute = createRoute({
  method: "get",
  path: "/profile",
  responses: {
    200: {
      description: "Profilo ottenuto correttamente",
      content: {
        "application/json": {
          schema: ProfileOpenapiSchema,
        },
      },
    },
    401: { description: "Token non valido o mancante" },
  },

  security: [{ bearerAuth: [] }],
});

const profileConfirmationRoute = createRoute({
  method: "patch",
  path: "/profile/confirmation",
  request: {
    body: {
      content: {
        "application/json": {
          schema: ProfileConfirmationOpenapiSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Profilo confermato",
      content: {
        "application/json": {
          schema: ProfileConfirmationOpenapiSchema,
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});

export const registerProfileRoutes = (app: any) => {
  app.use("/profile/confirmation", jwtAuth);
  app.use("/profile", jwtAuth);
  app.openapi(profileConfirmationRoute, confirmProfile);
  app.openapi(getProfileRoute, getProfile);
};
