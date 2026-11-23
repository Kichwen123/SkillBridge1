import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { json } from "express";
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
            process.env.JWT_SECRET, {
            expiresIn: "2d"
        }
        );
        // create cookie
        res.cookie("Victor", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 2 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullname}`,
            user: user.role,
        });
    }


    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "something went wrong again"
        })
    }
};
// check cookie
export const checkCookie = async (req, res) => {
    try {
        const token = req.cookies.Victor;
        if (token) {
            return res.status(200).json({
                message: true
            });
        }
        return res.status(200).json({
            message: false
        })
    }
    catch (error) {
        return res.status(500)({
            success: false,
            message: "Something went wrong"
        })
    }
};
export const getUserDetails = async (req, res) => {
    try {
        const { user } = req;
        res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })

    }
};
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("Victor", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });
        res.status(200).json({
            success: true,
            message: "Logged Out!"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
};
// change avatar
export const changeAvatar = async (req,res)=>{
    try {
        const {user} = req;
        const {file} = req;
        if(!file){
            return res.status(400).json({
                success:false,
                message:"No image selected"
            });
        }
        user.avatar = file.path;
        await user.save();

        return res.status(201).json({
            success:true,
            message:"Avatar updated successfully"
        })
        console.log(file);

    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        });
    }
}