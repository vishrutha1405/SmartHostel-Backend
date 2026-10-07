import mongoose from "mongoose";

let dbStatus = {
  isConnected: false,
  host: null,
  name: null,
  uri: process.env.MONGODB_URI || "mongodb://localhost:27017/smarthostel"
};

export const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI || "mongodb://localhost:27017/smarthostel";
  const fallbackUri = primaryUri.replace("localhost", "127.0.0.1");

  try {
    const conn = await mongoose.connect(primaryUri);
    dbStatus = {
      isConnected: true,
      host: conn.connection.host,
      name: conn.connection.name,
      uri: primaryUri
    };
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host} / ${conn.connection.name}`);
  } catch (primaryErr) {
    console.warn(`⚠️ Primary MongoDB URI (${primaryUri}) failed: ${primaryErr.message}. Trying fallback: ${fallbackUri}...`);
    try {
      const conn = await mongoose.connect(fallbackUri);
      dbStatus = {
        isConnected: true,
        host: conn.connection.host,
        name: conn.connection.name,
        uri: fallbackUri
      };
      console.log(`✅ MongoDB Connected via Fallback: ${conn.connection.host} / ${conn.connection.name}`);
    } catch (fallbackErr) {
      console.error(`❌ MongoDB Connection Error: ${fallbackErr.message}`);
      dbStatus.isConnected = false;
    }
  }
};

export const getDBStatus = () => ({
  ...dbStatus,
  readyState: mongoose.connection.readyState // 1 = connected, 0 = disconnected
});

