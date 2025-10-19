import express from "express";
import { getResume, updateResume, downloadResumePDF } from "../controllers/resume.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/", authenticate, getResume);
router.put("/", authenticate, updateResume);
router.get("/pdf", authenticate, downloadResumePDF);

export default router;
