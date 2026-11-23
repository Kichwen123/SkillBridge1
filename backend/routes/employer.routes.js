import express from "express";
import { createUser } from "../controllers/employer.controller.js";
const router = express.Router();

// register employer
router.post("/register", createUser);



export default router;