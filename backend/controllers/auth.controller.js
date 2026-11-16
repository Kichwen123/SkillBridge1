import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "something went wrong again"
            })
        }
        const normalizedEmail = email.toLowerCase().trim();
        // check if user eixts
        const user = await User.findOne({ email: normalizedEmail }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }
        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }
        // create token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,{
                expiresIn: "2d"
            }
        );
        // create cookie
        res.cookie("Victor",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            path:"/",
            maxAge:2 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            success:true,
            message:`Welcome back ${user.fullname}`,
            user:user.role,
        });
    }


    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "something went wrong again"
        })
    }
}