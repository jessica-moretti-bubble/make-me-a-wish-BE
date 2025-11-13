import { jwt } from "hono/jwt";

export const jwtAuth = jwt({
  secret: process.env.JWT_SECRET || "super-super-secret",
});
