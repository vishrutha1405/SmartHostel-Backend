import { Menu } from "../models/Menu.js";

export const getMenu = async (req, res) => {
  try {
    let menu = await Menu.findOne({ key: "daily_menu" });
    if (!menu) {
      return res.status(404).json({ success: false, error: "Menu not found." });
    }
    const formattedMenu = {
      breakfast: menu.breakfast,
      lunch: menu.lunch,
      snacks: menu.snacks,
      dinner: menu.dinner
    };
    return res.json({ success: true, data: formattedMenu });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const newMenu = req.body;
    const menu = await Menu.findOneAndUpdate(
      { key: "daily_menu" },
      { $set: newMenu },
      { new: true, upsert: true }
    );
    return res.json({
      success: true,
      menu: {
        breakfast: menu.breakfast,
        lunch: menu.lunch,
        snacks: menu.snacks,
        dinner: menu.dinner
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
