import type { Context } from "hono";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";
import { Auth } from "../schemas/auth/auth.mongoose.schema.js";
import { UserProfile } from "../schemas/profile/profile.mongoose.schema.js";

export const register = async (c: Context) => {
  const { email, password, name, surname } = await c.req.json();

  const exists = await Auth.findOne({ email });

  if (exists) return c.json({ error: "Email già registrata" }, 400);

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await Auth.create({ email, passwordHash });

  await UserProfile.create({ name, surname, userId: user.id });

  return c.json(201);
};

export const login = async (c: Context) => {
  const { email, password } = await c.req.json();

  const user = await Auth.findOne({ email });

  if (!user) return c.json({ error: "Utente non trovato" }, 404);

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) return c.json({ error: "Password errata" }, 401);

  const token = await sign(
    { sub: user._id.toString(), email: user.email },
    process.env.JWT_SECRET || "dev-secret"
  );

  const profile = await UserProfile.findOne({ userId: user.id });

  const profileIsCompleted = profile?.username ? true : false;

  return c.json({ token, profileIsCompleted });
};
