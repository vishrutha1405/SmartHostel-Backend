import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    rollNo: { type: String, default: "" },
    block: { type: String, default: "" },
    roomNo: { type: String, default: "" },
    emergencyTokens: { type: Number, default: 10 },
    date: { type: String, default: () => new Date().toISOString().split("T")[0] }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
