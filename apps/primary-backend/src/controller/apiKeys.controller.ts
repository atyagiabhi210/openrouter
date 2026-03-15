import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../authMiddleware";
import {
  createApiKey,
  deleteApiKey,
  getApiKeys,
  toggleApiKeyStatus,
} from "../services/apiKeys.service";

export const handleCreateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const createApiKeyResponse = await createApiKey(req.body, userId);
    res.status(201).json(createApiKeyResponse);
  } catch (err) {
    next(err);
  }
};

export const handleGetApiKeys = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const getApiKeysResponse = await getApiKeys(userId);
    res.status(200).json(getApiKeysResponse);
  } catch (err) {
    next(err);
  }
};

export const handleDeleteApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const deleteApiKeyResponse = await deleteApiKey(req.body, userId);
    res.status(200).json(deleteApiKeyResponse);
  } catch (err) {
    next(err);
  }
};

export const handleToggleApiKeyStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const toggleApiKeyStatusResponse = await toggleApiKeyStatus(
      req.body,
      userId,
    );
    res.status(200).json(toggleApiKeyStatusResponse);
  } catch (err) {
    next(err);
  }
};
