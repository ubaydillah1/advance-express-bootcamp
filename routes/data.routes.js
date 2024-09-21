import express from "express";
const router = express.Router();
import * as dataController from "../controllers/data.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

// GET all data
router.get("/course", verifyToken, dataController.getAllData);

// GET data by ID
router.get("/course/:id", verifyToken, dataController.getDataById);

// PATCH update data
router.put("/course/:id", verifyToken, dataController.updateData);

// DELETE data
router.delete("/course/:id", verifyToken, dataController.deleteData);

// POST insert data
router.post("/course", verifyToken, dataController.insertData);

export default router;
