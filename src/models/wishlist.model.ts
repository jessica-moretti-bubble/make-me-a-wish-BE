import { Document, Types } from "mongoose";

export interface Wishlist extends Document {
  name: string;
  userId?: Types.ObjectId;
  iconName: string;
  gifts: Types.ObjectId[];
}
