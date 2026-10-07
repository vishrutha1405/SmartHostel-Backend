import express from "express";
import { getBufferPercentage, setBufferPercentage } from "../controllers/configController.js";

const router = express.Router();

router.get("/buffer", getBufferPercentage);
router.put("/buffer", setBufferPercentage);

export default router;
