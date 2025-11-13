import { z } from "@hono/zod-openapi";

export const WishlistsOpenapiSchema = z.object({
  name: z.string().openapi({
    example: "Birthday",
    description: "Wishlist title",
  }),
  iconName: z.string().openapi({
    example: "🎂",
    description: "Wishlist icon",
  }),
  _id: z.string().openapi({
    example: "fsdfsdfsdf",
    description: "Wishlist id",
  }),
  gifts: z
    .array(
      z.string().openapi({
        example: "675af3d812f50d7a1a4bcd90",
        description: "Gift id",
      })
    )
    .openapi({
      description: "Gift id lists",
    }),
});
