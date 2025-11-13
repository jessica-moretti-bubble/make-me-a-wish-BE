import type { Context } from "hono";
import { UserProfile } from "../schemas/profile/profile.mongoose.schema.js";
import { getUserIdFromContext } from "../utils/auth.utils.js";
import { getUserProfile } from "../utils/profile.utils.js";

export const confirmProfile = async (c: Context) => {
  const userId = getUserIdFromContext(c);

  if (!userId) return c.json({ error: "Token non valido o mancante" }, 401);

  const { username } = await c.req.json();

  const updated = await UserProfile.findOneAndUpdate(
    { userId },
    { username },
    { new: true }
  );

  if (!updated) return c.json({ error: "Utente non trovato" }, 404);

  return c.json({ username });
};

export const getProfile = async (c: Context) => {
  const userId = getUserIdFromContext(c);

  if (!userId) return c.json({ error: "Token non valido o mancante" }, 401);

  const profile = await getUserProfile(userId);

  if (!profile) return c.json({ error: "Utente non trovato" }, 404);

  return c.json({
    userId: profile.userId,
    name: profile.name,
    surname: profile.surname,
    username: profile.username,
  });
};
