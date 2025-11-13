import mongoose, { Schema } from "mongoose";
import type { Profile } from "../../models/profile.model.js";
const ProfileMongooseSchema = new Schema<Profile>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: false },
  userId: { type: String, required: true, unique: true },
  wishlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Wishlist" }],
});

export const UserProfile = mongoose.model<Profile>(
  "Profile",
  ProfileMongooseSchema
);
