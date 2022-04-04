import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export async function connectDB() {
  try {
    console.log("Connecting to database...");
    const db = await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected to", db.connection.name);
  } catch (err) {
    console.error(err.message);
  }
}
