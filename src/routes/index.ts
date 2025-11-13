import { OpenAPIHono } from "@hono/zod-openapi";
import { registerAuthRoutes } from "./auth.route.js";
import { registerProfileRoutes } from "./profile.route.js";
import { registerWishlistRoutes } from "./wishlist.route.js";

export const registerRoutes = (app: OpenAPIHono) => {
  registerAuthRoutes(app);
  registerProfileRoutes(app);
  registerWishlistRoutes(app);
};
