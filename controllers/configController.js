import { Config } from "../models/Config.js";

export const getBufferPercentage = async (req, res) => {
  try {
    let config = await Config.findOne({ key: "system_config" });
    const bufferPercent = config ? config.bufferPercent : 8;
    return res.json({ success: true, bufferPercent });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const setBufferPercentage = async (req, res) => {
  try {
    const { percent } = req.body;
    const bufferPercent = Number(percent) || 8;
    const config = await Config.findOneAndUpdate(
      { key: "system_config" },
      { $set: { bufferPercent } },
      { new: true, upsert: true }
    );
    return res.json({ success: true, bufferPercent: config.bufferPercent });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
