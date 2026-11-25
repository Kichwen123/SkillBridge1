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