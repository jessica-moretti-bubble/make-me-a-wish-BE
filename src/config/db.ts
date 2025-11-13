import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error("❌ MONGO_URI non trovata nel .env");

    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connesso con successo!");
  } catch (err) {
    console.error("❌ Errore connessione MongoDB:", err);
    process.exit(1);
  }
};
