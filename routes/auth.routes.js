import express from "express";
import {
  register,
  login,
  verifyEmail,
} from "../controllers/auth.controller.js";
const router = express.Router();

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// VERIFIKASI EMAIL
router.get("/verify-email", verifyEmail);

export default router;
