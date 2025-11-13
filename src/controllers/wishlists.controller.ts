import type { Context } from "hono";
import { UserProfile } from "../schemas/profile/profile.mongoose.schema.js";
import { UserWishlist } from "../schemas/wishlists/wishlists.mongoose.schema.js";
import { UserGift } from "../schemas/gifts/gifts.mongoose.schema.js";
import mongoose from "mongoose";
import { getUserIdFromContext } from "../utils/auth.utils.js";
import { getUserProfile } from "../utils/profile.utils.js";
import { getUserWishlist } from "../utils/wishlist.utils.js";

export const getWishlists = async (c: Context) => {
  const userId = getUserIdFromContext(c);

  if (!userId) return c.json({ error: "Token non valido o mancante" }, 401);

  const profile = await getUserProfile(userId);

  if (!profile) return c.json({ error: "Utente non trovato" }, 404);

  const wishlists = await UserWishlist.find({
    _id: { $in: profile.wishlists },
  })
    .populate("gifts")
    .sort({ createdAt: -1 });

  return c.json(wishlists);
};

export const deleteWishlist = async (c: Context) => {
  const wishlistId = c.req.param("id");

  if (!wishlistId) return c.json({ error: "Parametro ID mancante" }, 400);

  const userId = getUserIdFromContext(c);

  if (!userId) return c.json({ error: "Token non valido o mancante" }, 401);

  const profile = await getUserProfile(userId);

  if (!profile) return c.json({ error: "Utente non trovato" }, 404);

  const wishlist = await getUserWishlist(wishlistId, userId);

  if (!wishlist)
    return c.json(
      { error: "Wishlist non trovata o non appartenente all'utente" },
      404
    );

  await UserWishlist.findByIdAndDelete(wishlistId);

  return c.body(null, 204);
};

export const deleteWish = async (c: Context) => {
  const categoryId = c.req.param("categoryId");

  const wishId = c.req.param("wishId");

  if (!categoryId || !wishId)
    return c.json({ error: "Parametri mancanti" }, 400);

  const userId = getUserIdFromContext(c);

  if (!userId) return c.json({ error: "Token non valido o mancante" }, 401);

  const profile = await getUserProfile(userId);

  if (!profile) return c.json({ error: "Utente non trovato" }, 404);

  const wishlist = await getUserWishlist(categoryId, userId);
  if (!wishlist)
    return c.json(
      { error: "Wishlist non trovata o non appartenente all'utente" },
      404
    );

  const deleted = await UserGift.findOneAndDelete({
    _id: wishId,
    categoryId,
  });

  if (!deleted)
    return c.json(
      { error: "Gift non trovato o non appartenente alla categoria" },
      404
    );

  return c.body(null, 204);
};

export const getGifts = async (c: Context) => {
  const userId = getUserIdFromContext(c);

  if (!userId) return c.json({ error: "Token non valido o mancante" }, 401);

  const categoryId = c.req.query("categoryId");

  if (!categoryId)
    return c.json({ error: "Parametro categoryId mancante" }, 400);

  const profile = await getUserProfile(userId);

  if (!profile) return c.json({ error: "Utente non trovato" }, 404);

  const owns = profile.wishlists?.some((id) => id.toString() === categoryId);

  if (!owns)
    return c.json({ error: "Wishlist non appartenente all'utente" }, 403);

  const gifts = await UserGift.find({ categoryId }).lean();

  return c.json(gifts);
};

export const addWishlist = async (c: Context) => {
  const { name, iconName } = await c.req.json();

  const userId = getUserIdFromContext(c);

  if (!userId) return c.json({ error: "Token non valido o mancante" }, 401);

  const profile = await getUserProfile(userId);

  if (!profile) return c.json({ error: "Utente non trovato" }, 404);

  const newWishlist = await UserWishlist.create({
    name,
    iconName,
    userId,
    gifts: [],
  });

  profile?.wishlists?.push(newWishlist.id);

  await profile.save();

  return c.json({ newWishlist }, 201);
};

export const addGift = async (c: Context) => {
  const {
    title,
    description,
    categoryId,
    imageKey,
    isReceived,
    location,
    locationUrl,
    price,
  } = await c.req.json();

  const userId = getUserIdFromContext(c);

  if (!userId) return c.json({ error: "Token non valido o mancante" }, 401);

  const profile = await getUserProfile(userId);
  if (!profile) return c.json({ error: "Utente non trovato" }, 404);

  const wishlist = await getUserWishlist(categoryId, userId);
  if (!wishlist)
    return c.json(
      { error: "Wishlist non trovata o non appartenente all'utente" },
      404
    );

  const newGift = await UserGift.create({
    title,
    description,
    categoryId,
    imageKey,
    isReceived,
    location,
    locationUrl,
    price,
  });

  await UserWishlist.findByIdAndUpdate(
    categoryId,
    { $push: { gifts: newGift.id } },
    { new: true }
  );

  return c.json({ newGift }, 201);
};
