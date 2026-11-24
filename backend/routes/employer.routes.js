import express from "express";
import { createUser, postJobs } from "../controllers/employer.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

// register employer
router.post("/register", createUser);
// post job
router.post("/post-job",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("employer"),
    postJobs);


export default router;