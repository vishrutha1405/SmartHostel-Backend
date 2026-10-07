import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    feedbackId: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    roomNo: { type: String, default: "" },
    meal: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    category: { type: String, default: "General" },
    comment: { type: String, default: "" },
    date: { type: Date, default: Date.now },
    qrPayload: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
