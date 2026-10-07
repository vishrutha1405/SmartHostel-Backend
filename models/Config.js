import mongoose from "mongoose";

const configSchema = new mongoose.Schema(
  {
    key: { type: String, default: "system_config", unique: true },
    bufferPercent: { type: Number, default: 8 }
  },
  { timestamps: true }
);

export const Config = mongoose.model("Config", configSchema);
