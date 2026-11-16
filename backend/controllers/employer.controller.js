import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const createUser = async (req,res) => {
    // error handling
    try {
        const { fullname, email, phone, location, password } = req.body;

        // validation
        if (!fullname || !email || !phone || !location || !password) {

            return res.status(400).json({
                success: false,
                message: "Something went wrong"
            });


        }
       
        const normalizedEmail = email.toLowerCase().trim();
        //search for an existing user
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with email already exists"
            });
        }
         //hash the password
        const hashedPassword = await bcrypt.hash(password, 12);
        if (password.length < 8)
            {
            return res.status(400).json({
            success: false,
            message: "Password has to be atleast 8 characters"
        })

            }
     // save user
     const newEmployer =  new User({
        fullname,
        email: normalizedEmail,
        phone,
        location,
        password:hashedPassword,
        role: "employer"
     });
      await newEmployer.save();
       
    return res.status(200).json({
            success: true,
            message: `Company with name ${fullname} created`
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