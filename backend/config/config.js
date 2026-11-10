// Make connection to the database.
import mongoose from "mongoose";
export const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        if (connection)
        {
            console.log("Connected successfully")
        }
        
    } catch (error) {
        console.log("Failed to connect");
        console.log(error);
        process.exit(1);
    }
}