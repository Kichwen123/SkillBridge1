import express from "express";
import { dashboardData, fetchAllJobs, fetchUsers } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
 const router = express.Router();
 //dashboard data
 router.get("/dashboard", 
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    dashboardData);
// fetch users
router.get("/all-users",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    fetchUsers
)
// fetch all jobs
router.get("/all-jobs",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    fetchAllJobs);
    
 export default router;

