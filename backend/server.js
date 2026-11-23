import express from "express";
import dotenv from "dotenv";
import employerRoutes from "./routes/employer.routes.js";
import { connectDB } from "./config/config.js";
import authRoutes from "./routes/auth.routes.js";
import jobSeekerRoutes from "./routes/jobseeker.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();// allows us to process environment variables
// create an instance of express
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",

    ],
    credentials: true
}));
const PORT = process.env.PORT;
// health check
app.use("/api/v2/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "backend working just fine"
    })
});
// path
app.use("/api/v1/employer", employerRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobseeker",jobSeekerRoutes)
const startServer = async () => {
    connectDB();
    app.listen(PORT, () => {
        console.log(`Listening to request via PORT ${PORT}`)
    });

}
startServer();