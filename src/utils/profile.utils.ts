import { UserProfile } from "../schemas/profile/profile.mongoose.schema.js";

export const getUserProfile = async (userId: string) => {
  return UserProfile.findOne({ userId });
};
