import { serve } from "@hono/node-server";
import app from "./index.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

await connectDB();

serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  (info) => {
    console.log(`running at http://localhost:${info.port}`);
  }
);
