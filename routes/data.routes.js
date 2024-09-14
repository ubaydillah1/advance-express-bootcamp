import express from "express";
const router = express.Router();
import * as dataController from "../controllers/data.controller.js";

// GET all data
router.get("/course", dataController.getAllData);

// GET data by ID
router.get("/course/:id", dataController.getDataById);

// PATCH update data
router.put("/course/:id", dataController.updateData);

// DELETE data
router.delete("/course/:id", dataController.deleteData);

// POST insert data
router.post("/course", dataController.insertData);

export default router;
