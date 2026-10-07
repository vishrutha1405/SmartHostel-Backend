import { WasteLog } from "../models/WasteLog.js";

export const getWasteLogs = async (req, res) => {
  try {
    const logs = await WasteLog.find().sort({ date: 1 });
    const formatted = logs.map((l) => ({
      date: l.date,
      breakfast: l.breakfast,
      lunch: l.lunch,
      snacks: l.snacks,
      dinner: l.dinner
    }));
    return res.json({ success: true, data: formatted });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const addWasteLog = async (req, res) => {
  try {
    const log = req.body;
    if (!log.date) {
      return res.status(400).json({ success: false, error: "Date is required for waste log." });
    }

    const updated = await WasteLog.findOneAndUpdate(
      { date: log.date },
      { $set: log },
      { new: true, upsert: true }
    );

    const logs = await WasteLog.find().sort({ date: 1 });
    const formatted = logs.map((l) => ({
      date: l.date,
      breakfast: l.breakfast,
      lunch: l.lunch,
      snacks: l.snacks,
      dinner: l.dinner
    }));

    return res.json({ success: true, logs: formatted });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
