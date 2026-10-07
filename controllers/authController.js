import { User } from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found. Please register or check details." });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, error: "Invalid password. Please try again." });
    }

    const userData = {
      id: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
      rollNo: user.rollNo,
      block: user.block,
      roomNo: user.roomNo,
      emergencyTokens: user.emergencyTokens,
      date: user.date || new Date().toISOString().split("T")[0]
    };

    return res.json({ success: true, data: userData });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const register = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.email || !userData.password || !userData.name) {
      return res.status(400).json({ success: false, error: "Name, email, and password are required." });
    }

    const exists = await User.findOne({ email: userData.email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ success: false, error: "Email already registered!" });
    }

    const userId = `usr_${Date.now()}`;
    const todayDate = new Date().toISOString().split("T")[0];
    const newUser = await User.create({
      userId,
      name: userData.name,
      email: userData.email.toLowerCase(),
      password: userData.password,
      role: userData.role || "student",
      rollNo: userData.rollNo || "",
      block: userData.block || "",
      roomNo: userData.roomNo || "",
      emergencyTokens: 10,
      date: todayDate
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful! Data automatically stored in MongoDB.",
      databaseStored: "MongoDB",
      collection: "users",
      databaseName: "smarthostel",
      data: {
        id: newUser.userId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        date: newUser.date
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
