import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { registerRoutes } from "./routes/index.js";
import { cors } from "hono/cors";

const app = new OpenAPIHono();

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.openAPIRegistry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    title: "MakeMeAWish API",
    version: "1.0.0",
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
} as any);

app.get("/swagger", swaggerUI({ url: "/doc" }));

registerRoutes(app);

export default app;
