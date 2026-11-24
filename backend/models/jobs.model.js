import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
jobTitle: {
    type: String,
    required: true,
    trim: true
},
companyName: {
    type: String,
    required: true,
    trim: true
},
location: {
    type: String,
    required: true,
    trim: true
},
employmentType:{
    type: String,
    required: true,
    trim: true
},
jobRequirements: {
    type: String,
    required: true,
    trim: true
},
experience: {
    type: String,
    required: true,
    trim: true
},
deadline: {
    type: Date,
    required: true
},
employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
paymentStatus: {
    type: String,
    required: true,
    enum: ["unpaid", "pending","paid"],
    default: "unpaid",


},
isPublished: {
    type: Boolean,
    default: false
}


});
const Job = mongoose.model("Job", jobSchema);
export default Job;