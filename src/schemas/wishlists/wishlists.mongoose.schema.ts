import mongoose, { Schema } from "mongoose";
import type { Wishlist } from "../../models/wishlist.model.js";

const WishlistSchema = new Schema<Wishlist>(
  {
    name: { type: String, required: true },
    iconName: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    gifts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gift" }],
  },
  { timestamps: true }
);

export const UserWishlist = mongoose.model<Wishlist>(
  "Wishlist",
  WishlistSchema
);
