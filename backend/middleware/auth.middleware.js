import jwt from "jsonwebtoken"
import User from "../models/user.js";
export const authMiddleware = {
    verifyToken: async(req,res,next) => {
        const token = req.cookies.Victor;
        if(!token){
            return res.status(401) .json({
                success: false,
                message: "You have to be logged in"
            });
        }
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            // fetch user details as per the id in the decoded token
            const user = await User.findById(decoded.id);

            // make user details available to all other controllers
            req.user = user;
            next();
        } 
        catch (error) {
            return res.status(500).json({
                success : false,
                message: "something went wrong"
            })
        }
    },
    authorizeRole: (role)=>{
        return (req,res,next)=>{
            if(req.user.role !== role){
                return res.status(403).json({
                    success:false,
                    message: "Unauthorized Operation"
                });
            }
            next();
        }
    }
}