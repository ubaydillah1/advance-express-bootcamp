import { uploadImage } from "../controllers/upload.controller.js";
import { upload } from "../services/upload.services.js";
import express from "express";

const router = express.Router();

router.post("/upload", upload().single("image"), uploadImage);

export default router;
