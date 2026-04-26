import { Router } from "express";
import {
  googleCallback,
  googleLogin,
  healthCheck,
  logout,
} from "../controllers/authController";

const router = Router();

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);
router.get("/health", healthCheck);
router.post("/logout", logout);

export default router;
