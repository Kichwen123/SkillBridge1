import User from "../models/user.js";
import Job from "../models/jobs.model.js";


// dashboard data
export const dashboardData = async (req, res) => {
    try {
        // count job seekers
        const jobSeeker = await User.countDocuments({ role: "jobseeker" });
        if (!jobSeeker) {
            return res.status(404).json({
                success: false,
                message: "No jobseeker found"
            });
        }

        // count employers
        const employerCount = await User.countDocuments({ role: "employer" });
        if (!employerCount) {
            return res.status(404).json({
                success: false,
                message: "No employers found"
            });
        }
        // count job seekers
        const jobs = await User.countDocuments();
        if (!jobs) {
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            });
        }
        // send data to frontend
        return res.status(200).json({
            success: true,
            jobSeeker, employerCount, jobs
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }
}

// Fetch user data
export const fetchUsers = async (req, res) => {
    try {
        // Fetch employers
        const employerList = await User.find({ role: "employer" });

        // Fetch jobseekers
        const jobSeekerList = await User.find({ role: "jobseeker" });

        // Check if both lists are empty
        if (employerList.length === 0 && jobSeekerList.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }

        // Return the fetched users
        return res.status(200).json({
            success: true,
            employerList,
            jobSeekerList
        });

    } catch (error) {
        console.error("Error fetching users:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};
// fetch all jobs
export const fetchAllJobs = async (req,res)=>{
    try {
        const allJobs = await Job.find();
        if(!allJobs){
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            })
        }
        return res.status(200).json({
            success: true,
            allJobs
        })
    }
     catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}