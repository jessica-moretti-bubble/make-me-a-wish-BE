import { z } from "@hono/zod-openapi";

export const GiftOpenapiSchema = z.object({
  title: z.string().openapi({
    example: "iPhone 16 Pro",
    description: "Titolo o nome del regalo",
  }),
  description: z.string().openapi({
    example: "Ultimo modello Apple",
    description: "Descrizione del regalo",
  }),
  categoryId: z.string().optional().openapi({
    example: "675af9d812f50d7a1a4bce90",
    description: "ID della categoria (opzionale)",
  }),
  imageKey: z.string().optional().openapi({
    example: "uploads/iphone16.png",
    description: "Chiave o percorso dell'immagine",
  }),
  isReceived: z.boolean().default(false).optional().openapi({
    example: false,
    description: "True se il regalo è stato ricevuto",
  }),
  location: z.string().optional().openapi({
    example: "Milano",
    description: "Luogo dove si trova o può essere acquistato",
  }),
  locationUrl: z.string().optional().openapi({
    example: "https://apple.com/it",
    description: "Link al negozio o posizione",
  }),
  price: z
    .number()
    .nonnegative()
    .optional()
    .openapi({ example: 1299, description: "Prezzo del regalo" }),
});
