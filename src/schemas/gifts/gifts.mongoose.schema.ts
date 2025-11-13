import mongoose, { Schema } from "mongoose";
import type { Gift } from "../../models/gift.model.js";

const GiftSchema = new Schema<Gift>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Wishlist" },
    imageKey: { type: String },
    isReceived: { type: Boolean, default: false },
    location: {
      lat: { type: String, required: false },
      lng: { type: String, required: false },
    },
    locationUrl: { type: String },
    price: { type: Number, min: 0 },
  },
  { timestamps: true }
);

export const UserGift = mongoose.model<Gift>("Gift", GiftSchema);
