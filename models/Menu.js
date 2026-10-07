import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  items: { type: String, required: true },
  calories: { type: Number, default: 0 },
  ingredients: { type: String, default: "" },
  allergens: { type: String, default: "None" },
  cutoffTime: { type: String, default: "" }
});

const menuSchema = new mongoose.Schema(
  {
    key: { type: String, default: "daily_menu", unique: true },
    breakfast: { type: mealSchema, required: true },
    lunch: { type: mealSchema, required: true },
    snacks: { type: mealSchema, required: true },
    dinner: { type: mealSchema, required: true }
  },
  { timestamps: true }
);

export const Menu = mongoose.model("Menu", menuSchema);
