import express from "express";
import authRoutes from "./auth.routes.js";
import resumeRoutes from "./resume.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/resume", resumeRoutes);

export default router;
