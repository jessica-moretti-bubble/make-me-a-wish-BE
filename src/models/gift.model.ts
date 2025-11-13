import mongoose from "mongoose";

export interface Gift {
  title: string;
  description: string;
  categoryId?: mongoose.Types.ObjectId;
  imageKey?: string;
  isReceived?: boolean;
  location?: string;
  locationUrl?: string;
  price?: number;
}
