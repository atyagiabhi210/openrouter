import type { Request, Response, NextFunction } from "express";
import {
  handleSignService,
  handleSignUpService,
} from "../services/auth.service";

export const handleSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("handleSignUp", req.body);
  try {
    const signUpResponse = await handleSignUpService(req.body);
    if ("success" in signUpResponse && signUpResponse.success === false) {
      return res.status(signUpResponse.status).json(signUpResponse);
    }
    res.status(201).json(signUpResponse);
  } catch (err) {
    next(err);
  }
};

export const handleSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const signInResponse = await handleSignService(req.body);
    res.status(200).json(signInResponse);
  } catch (err) {
    next(err);
  }
};
