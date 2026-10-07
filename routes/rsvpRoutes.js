import express from "express";
import {
  getRSVPs,
  getStudentRSVPs,
  submitRSVP,
  submitEmergencyMealRequest,
  getEmergencyTokens
} from "../controllers/rsvpController.js";

const router = express.Router();

router.get("/", getRSVPs);
router.get("/student/:userId", getStudentRSVPs);
router.post("/", submitRSVP);
router.post("/emergency", submitEmergencyMealRequest);
router.get("/tokens/:userId", getEmergencyTokens);

export default router;
