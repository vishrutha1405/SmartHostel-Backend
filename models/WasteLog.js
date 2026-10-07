import mongoose from "mongoose";

const wasteLogSchema = new mongoose.Schema(
  {
    date: { type: String, required: true, unique: true },
    breakfast: { type: Number, default: 0 },
    lunch: { type: Number, default: 0 },
    snacks: { type: Number, default: 0 },
    dinner: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const WasteLog = mongoose.model("WasteLog", wasteLogSchema);
