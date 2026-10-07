import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema(
  {
    rsvpId: { type: String, required: true, unique: true },
    studentId: { type: String, required: true },
    name: { type: String, required: true },
    meal: { type: String, enum: ["breakfast", "lunch", "snacks", "dinner"], required: true },
    status: { type: String, enum: ["attending", "skipping", "late_request"], required: true },
    date: { type: String, default: () => new Date().toISOString().split("T")[0] }
  },
  { timestamps: true }
);

export const RSVP = mongoose.model("RSVP", rsvpSchema);
