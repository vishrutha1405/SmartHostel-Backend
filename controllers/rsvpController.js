import { RSVP } from "../models/RSVP.js";
import { User } from "../models/User.js";

export const getRSVPs = async (req, res) => {
  try {
    const rsvps = await RSVP.find().sort({ createdAt: -1 });
    const formatted = rsvps.map((r) => ({
      id: r.rsvpId,
      studentId: r.studentId,
      name: r.name,
      meal: r.meal,
      status: r.status
    }));
    return res.json({ success: true, data: formatted });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const getStudentRSVPs = async (req, res) => {
  try {
    const { userId } = req.params;
    const rsvps = await RSVP.find({ studentId: userId });
    const formatted = rsvps.map((r) => ({
      id: r.rsvpId,
      studentId: r.studentId,
      name: r.name,
      meal: r.meal,
      status: r.status
    }));
    return res.json({ success: true, data: formatted });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const submitRSVP = async (req, res) => {
  try {
    const { userId, studentName, meal, status } = req.body;
    if (!userId || !meal || !status) {
      return res.status(400).json({ success: false, error: "Missing required RSVP parameters." });
    }

    let existing = await RSVP.findOne({ studentId: userId, meal });
    if (existing) {
      existing.status = status;
      await existing.save();
    } else {
      const rsvpId = `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
      await RSVP.create({
        rsvpId,
        studentId: userId,
        name: studentName || "Student",
        meal,
        status
      });
    }

    const allRSVPs = await RSVP.find();
    const formatted = allRSVPs.map((r) => ({
      id: r.rsvpId,
      studentId: r.studentId,
      name: r.name,
      meal: r.meal,
      status: r.status
    }));

    return res.json({ success: true, rsvps: formatted });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const submitEmergencyMealRequest = async (req, res) => {
  try {
    const { userId, studentName, meal } = req.body;

    const user = await User.findOne({ userId });
    let currentTokens = user ? user.emergencyTokens : 10;

    if (currentTokens <= 0) {
      return res.status(400).json({
        success: false,
        error: "No Emergency Tokens remaining for this month! (-10 Eco Points penalty applied instead)."
      });
    }

    const existingMealEmergencyCount = await RSVP.countDocuments({ meal, status: "late_request" });
    if (existingMealEmergencyCount >= 20) {
      return res.status(400).json({
        success: false,
        error: "Kitchen Emergency Buffer limit reached (20/20 slots full for this meal). Please contact Warden."
      });
    }

    currentTokens = Math.max(0, currentTokens - 1);
    if (user) {
      user.emergencyTokens = currentTokens;
      await user.save();
    }

    let existing = await RSVP.findOne({ studentId: userId, meal });
    if (existing) {
      existing.status = "late_request";
      await existing.save();
    } else {
      const rsvpId = `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
      await RSVP.create({
        rsvpId,
        studentId: userId,
        name: studentName || "Student",
        meal,
        status: "late_request"
      });
    }

    const allRSVPs = await RSVP.find();
    const formatted = allRSVPs.map((r) => ({
      id: r.rsvpId,
      studentId: r.studentId,
      name: r.name,
      meal: r.meal,
      status: r.status
    }));

    return res.json({ success: true, remainingTokens: currentTokens, rsvps: formatted });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const getEmergencyTokens = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    return res.json({ success: true, tokens: user ? user.emergencyTokens : 10 });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
