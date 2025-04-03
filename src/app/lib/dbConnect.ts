import mongoose from "mongoose";

// Define a global cache for the connection
interface ConnectionCache {
  isConnected?: number;
}

// Attach the connection cache to the global object
const globalCache = global as unknown as { mongoose?: ConnectionCache };

// Database Connection Function
async function dbConnect(): Promise<void> {
  if (globalCache.mongoose?.isConnected) {
    console.log("🔄 Using existing database connection");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in environment variables");
    throw new Error("MONGODB_URI must be defined");
  }

  try {
    // Establish a new connection
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Increase timeout for better handling
    });

    globalCache.mongoose = { isConnected: conn.connections[0].readyState };

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}

export default dbConnect;
