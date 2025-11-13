import mongoose from "mongoose";

export interface Gift {
  title: string;
  description: string;
  categoryId?: mongoose.Types.ObjectId;
  imageKey?: string;
  isReceived?: boolean;
  location?: {
    lat: string;
    lng: string;
  };
  locationUrl?: string;
  price?: number;
}
