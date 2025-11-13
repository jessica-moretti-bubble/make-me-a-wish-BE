import { createRoute, z } from "@hono/zod-openapi";
import { jwtAuth } from "../middleware/auth.js";
import { WishlistsOpenapiSchema } from "../schemas/wishlists/wishlists.openapi.schema.js";
import { WishlistPayloadSchema } from "../schemas/wishlists/wishlists.payload.schema.js";
import {
  addGift,
  addWishlist,
  deleteWish,
  deleteWishlist,
  getGifts,
  getWishlists,
  updateGift,
  updateWishlist,
} from "../controllers/wishlists.controller.js";
import { GiftOpenapiSchema } from "../schemas/gifts/gifts.openapi.schema.js";

const getWishlistsRoute = createRoute({
  method: "get",
  path: "/wishlists",
  responses: {
    200: {
      description: "Wishlists",
      content: {
        "application/json": {
          schema: WishlistsOpenapiSchema,
        },
      },
    },
    401: { description: "Token non valido o mancante" },
  },

  security: [{ bearerAuth: [] }],
});

const deleteWishlistRoute = createRoute({
  method: "delete",
  path: "/wishlists/{id}",
  description: "Elimina una wishlist",
  request: {
    params: z.object({ id: z.string() }),
  },

  responses: {
    204: {
      description: "Wishlist eliminata con successo",
    },
    401: { description: "Token non valido o mancante" },
    404: { description: "Wishlist non trovata" },
  },

  security: [{ bearerAuth: [] }],
});

const deleteWishRoute = createRoute({
  method: "delete",
  path: "/wishlists/{categoryId}/gifts/{wishId}",
  description: "Elimina una wishlist",
  request: {
    params: z.object({ categoryId: z.string(), wishId: z.string() }),
  },

  responses: {
    204: {
      description: "Gift eliminato con successo",
    },
    401: { description: "Token non valido o mancante" },
    404: { description: "Wishlist non trovata" },
  },

  security: [{ bearerAuth: [] }],
});

const updateWishlistRoute = createRoute({
  method: "patch",
  path: "/wishlists/{categoryId}",
  description: "Modifica una wishlist",
  request: {
    params: z.object({ categoryId: z.string() }),
    body: {
      content: {
        "application/json": {
          schema: WishlistPayloadSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: "Wishlist modificata con successo",
    },
    401: { description: "Token non valido o mancante" },
    404: { description: "Wishlist non trovata" },
  },

  security: [{ bearerAuth: [] }],
});

const updateGiftRoute = createRoute({
  method: "patch",
  path: "/wishlists/{categoryId}/gifts/{giftId}",
  description: "Modifica un regalo",
  request: {
    params: z.object({ categoryId: z.string(), giftId: z.string() }),
    body: {
      content: {
        "application/json": {
          schema: GiftOpenapiSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: "Gift modificato con successo",
    },
    401: { description: "Token non valido o mancante" },
    404: { description: "Wishlist non trovata" },
  },

  security: [{ bearerAuth: [] }],
});

const getGiftsRoute = createRoute({
  method: "get",
  path: "/wishlists/gifts",
  request: {
    query: z.object({
      categoryId: z.string().openapi({
        description: "ID della wishlist (categoria) per cui ottenere i regali",
        example: "675b1b304f6a1a2b9e5c7d12",
      }),
    }),
  },
  responses: {
    200: {
      description: "Lista dei regali appartenenti alla wishlist indicata",
      content: {
        "application/json": {
          schema: z.array(GiftOpenapiSchema),
        },
      },
    },
    400: { description: "Parametro categoryId mancante o non valido" },
    401: { description: "Token non valido o mancante" },
    403: { description: "Wishlist non appartenente all'utente" },
  },
  security: [{ bearerAuth: [] }],
});
const addWishlistRoute = createRoute({
  method: "post",
  path: "/wishlists",
  request: {
    body: {
      content: {
        "application/json": {
          schema: WishlistPayloadSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Wishlist creata correttamente",
      content: {
        "application/json": {
          schema: WishlistsOpenapiSchema,
        },
      },
    },
    401: { description: "Token non valido o mancante" },
  },
  security: [{ bearerAuth: [] }],
});

const addGiftRoute = createRoute({
  method: "post",
  path: "/wishlists/gifts",
  request: {
    body: {
      content: {
        "application/json": {
          schema: GiftOpenapiSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Gift creato",
    },
    401: { description: "Token non valido o mancante" },
  },
  security: [{ bearerAuth: [] }],
});

export const registerWishlistRoutes = (app: any) => {
  app.use("/wishlists", jwtAuth);
  app.use("/wishlists/gifts", jwtAuth);
  app.use("/wishlists/:id", jwtAuth);
  app.use("/wishlists/:categoryId/gifts/:wishId", jwtAuth);
  app.use("/wishlists/:categoryId", jwtAuth);
  app.openapi(deleteWishRoute, deleteWish);
  app.openapi(getWishlistsRoute, getWishlists);
  app.openapi(addWishlistRoute, addWishlist);
  app.openapi(deleteWishlistRoute, deleteWishlist);
  app.openapi(addGiftRoute, addGift);
  app.openapi(getGiftsRoute, getGifts);
  app.openapi(updateWishlistRoute, updateWishlist);
  app.openapi(updateGiftRoute, updateGift);
};
