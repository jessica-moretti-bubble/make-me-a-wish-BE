import mongoose, { Schema } from "mongoose";
import type { IAuth } from "../../models/auth.model.js";

const AuthSchema = new Schema<IAuth>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

export const Auth = mongoose.model<IAuth>("Auth", AuthSchema);
