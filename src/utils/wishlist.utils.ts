import { UserWishlist } from "../schemas/wishlists/wishlists.mongoose.schema.js";

export const getUserWishlist = async (wishlistId: string, userId: string) => {
  return UserWishlist.findOne({ _id: wishlistId, userId });
};
