import { Feedback } from "../models/Feedback.js";

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    const formatted = feedbacks.map((f) => ({
      id: f.feedbackId,
      studentName: f.studentName,
      roomNo: f.roomNo,
      meal: f.meal,
      rating: f.rating,
      category: f.category,
      comment: f.comment,
      date: f.date,
      qrPayload: f.qrPayload
    }));
    return res.json({ success: true, data: formatted });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const submitFeedback = async (req, res) => {
  try {
    const feedback = req.body;
    if (!feedback.studentName || !feedback.rating || !feedback.meal) {
      return res.status(400).json({ success: false, error: "Missing required feedback fields." });
    }

    const feedbackId = `fb_${Date.now()}`;
    const qrPayload = `FB-${feedback.roomNo || "ROOM"}-${(feedback.meal || "MEAL").toUpperCase()}-${feedback.rating}-${Date.now().toString().slice(-4)}`;

    const newFb = await Feedback.create({
      feedbackId,
      studentName: feedback.studentName,
      roomNo: feedback.roomNo || "",
      meal: feedback.meal,
      rating: Number(feedback.rating),
      category: feedback.category || "General",
      comment: feedback.comment || "",
      date: new Date(),
      qrPayload
    });

    const formatted = {
      id: newFb.feedbackId,
      studentName: newFb.studentName,
      roomNo: newFb.roomNo,
      meal: newFb.meal,
      rating: newFb.rating,
      category: newFb.category,
      comment: newFb.comment,
      date: newFb.date,
      qrPayload: newFb.qrPayload
    };

    return res.status(201).json({ success: true, feedback: formatted });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
