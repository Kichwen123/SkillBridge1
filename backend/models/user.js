import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true 
    },
    phone:{
        type: String,
        required:true,
        unique:true
    },
    location :{
        type: String,
        trim : true
        
    },
    password:{
        type : String,
        required : true,
        trim: true,
        select : false
    },
    role:{
      type: String,
      enum :["admin","employer","jobseeker"],
      default : "jobseeker"
    }
},{  timestamps: true });
const User = mongoose.model("User",userSchema)

export default User;