import type { Request, Response, NextFunction } from "express";
import { verifySessionToken } from "./services/jwt.service";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      });
    }
    const token = authHeader.slice(7); // "Bearer ".length
    const { userId, email } = await verifySessionToken(token);
    if (userId == null) {
      return res.status(401).json({
        success: false,
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      });
    }
    // Attach to request for downstream handlers
    (req as AuthenticatedRequest).userId = userId;
    (req as AuthenticatedRequest).email = email;
    next();
  } catch (err) {
    next(err);
  }
}

// Type for requests that have passed requireAuth
export interface AuthenticatedRequest extends Request {
  userId: number;
  email: string;
}
