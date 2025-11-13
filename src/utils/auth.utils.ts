import type { Context } from "hono";
import { UserProfile } from "../schemas/profile/profile.mongoose.schema.js";

export const getUserIdFromContext = (c: Context) => {
  const payload = c.get("jwtPayload");

  if (!payload?.sub) {
    return null;
  }

  return payload.sub as string;
};
