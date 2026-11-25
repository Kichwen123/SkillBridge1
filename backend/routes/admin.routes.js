import express from "express";
import { dashboardData } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
 const router = express.Router();
 //dashboard data
 router.get("/dashboard", 
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    dashboardData);

    
 export default router;

