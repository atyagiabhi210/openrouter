//  define routes to create get delete disable/enable api keys

import { Router } from "express";
import {
  handleCreateApiKey,
  handleGetApiKeys,
  handleDeleteApiKey,
  handleToggleApiKeyStatus,
} from "../controller/apiKeys.controller";
const router = Router();

router.post("/create", handleCreateApiKey);
router.get("/get", handleGetApiKeys);
router.delete("/delete", handleDeleteApiKey);
router.put("/toggle-status", handleToggleApiKeyStatus);

export default router;
