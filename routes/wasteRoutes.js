import express from "express";
import { getWasteLogs, addWasteLog } from "../controllers/wasteController.js";

const router = express.Router();

router.get("/", getWasteLogs);
router.post("/", addWasteLog);

export default router;
