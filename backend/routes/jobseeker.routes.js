import express from "express";
import { createJobSeeker } from "../controllers/jobSeeker.controller.js";
const router = express.Router();

router.post("/register",createJobSeeker)

export default router;