import { Router } from "express";
import { handleSignUp, handleSignIn } from "../controller/auth.controller";
const router = Router();

router.post("/sign-up", handleSignUp);
router.post("/sign-in", handleSignIn);

export default router;
