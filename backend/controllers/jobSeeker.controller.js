import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const createJobSeeker = async (req, res) => {
    // error handling
    try {
        const { fullname, email, phone, password } = req.body;

        // validation
        if (!fullname || !email || !phone || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });


        }

        const normalizedEmail = email.toLowerCase().trim();
        //search for an existing user
        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(409).json({
                success: false,
                message: "User with email already exists"
            });
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 12);
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Phone number taken"
            })

        }
        // save user
        const newJobSeeker = new User({
            fullname,
            email: normalizedEmail,
            phone,
          password: hashedPassword,
            role: "jobseeker"
        });
        await newJobSeeker.save();

        return res.status(200).json({
            success: true,
            message: `User with name ${fullname} created`
        });



    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }

}