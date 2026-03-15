import { requireAuth } from "../authMiddleware";
import apiKeysRoutes from "./apiKeys.routes";
import authRoutes from "./auth.routes";
import { Router } from "express";

const router = Router();

router.use("/auth", authRoutes);
router.use("/api-keys", requireAuth, apiKeysRoutes);

export default router;
