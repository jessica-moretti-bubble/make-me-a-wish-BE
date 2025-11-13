import { z } from "@hono/zod-openapi";

export const WishlistPayloadSchema = z.object({
  name: z.string().openapi({
    example: "Birthday",
    description: "Wishlist title",
  }),
  iconName: z.string().openapi({
    example: "🎂",
    description: "Wishlist icon",
  }),
});
