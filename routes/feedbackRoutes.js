import express from "express";
import { getFeedbacks, submitFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.get("/", getFeedbacks);
router.post("/", submitFeedback);

export default router;
