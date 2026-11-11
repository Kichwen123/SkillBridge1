import express from "express";
import dotenv from "dotenv";
import employerRoutes from "./routes/employer.routes.js"
import { connectDB } from "./config/config.js";
dotenv.config();// allows us to process environment variables
// create an instance of express
const app = express();
const PORT = process.env.PORT;
// health check
app.use("/api/v2/health",(req,res)=>{
res.status(200).json({
    success:true,
    message:"backend working just fine"
})
});
// path
app.use("/api/v1/employer",employerRoutes);
const startServer = async () => {
    connectDB();
    app.listen(PORT, () => {
        console.log(`Listening to request via PORT ${PORT}`)
    });

}
startServer();