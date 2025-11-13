export interface Profile extends Document {
  name: string;
  surname: string;
  username?: string;
  userId: string;
  wishlists?: string[];
}
