// src/routes/schoolRoutes.js
import express from "express";
import { addSchool, listSchools } from "../controllers/schoolController.js";

const router = express.Router();

// POST: Add a school
router.post("/addSchool", addSchool);

// GET: List schools sorted by proximity
router.get("/listSchools", listSchools);

export default router;
