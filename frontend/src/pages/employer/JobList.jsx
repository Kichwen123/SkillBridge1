import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaClock,
    FaCheckCircle,
    FaMoneyBillWave,
    FaArrowRight
} from "react-icons/fa";

const JobList = () => {

    const backendLink = useSelector((state) => state.prod.link);
    const userData = useSelector((state) => state.auth.user);

    const [jobs, setJobs] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(
                    `${backendLink}/api/v1/employer/employer-jobs`,
                    { withCredentials: true }
                );

                setJobs(response.data.jobs);
            }
            catch (error) {
                toast.error(
                    error.response?.data?.message || "Failed to fetch jobs"
                );
            }
            finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [backendLink]);

    // Pay for a job
    const payJob = async (jobId) => {
        try {
            console.log("Job ID:", jobId);
            //console.log("Employer Phone:", userData?.phone);

        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const publishedJobs = jobs?.filter(
        (job) => job.paymentStatus === "paid"
    ).length || 0;

    const unpaidJobs = jobs?.filter(
        (job) => job.paymentStatus === "unpaid"
    ).length || 0;

    return (
        <div className="container-fluid py-4">

            {/* Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <h4 className="fw-bold mb-1">My Job Listings</h4>
                    <p className="text-muted mb-0">
                        Manage your job postings and publication status.
                    </p>
                </div>

                <span className="badge bg-light text-dark border px-3 py-2">
                    <FaBriefcase className="me-2" />
                    {jobs?.length || 0} Total Jobs
                </span>
            </div>

            {/* Statistics */}
            <div className="row g-3 mb-4">

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-3">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted small mb-2">
                                        Total Jobs
                                    </p>
                                    <h3 className="fw-bold mb-0">
                                        {jobs?.length || 0}
                                    </h3>
                                </div>
                                <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3">
                                    <FaBriefcase size={22} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-3">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted small mb-2">
                                        Published Jobs
                                    </p>
                                    <h3 className="fw-bold text-success mb-0">
                                        {publishedJobs}
                                    </h3>
                                </div>
                                <div className="bg-success bg-opacity-10 text-success rounded-3 p-3">
                                    <FaCheckCircle size={22} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-3">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted small mb-2">
                                        Pending Payments
                                    </p>
                                    <h3 className="fw-bold text-warning mb-0">
                                        {unpaidJobs}
                                    </h3>
                                </div>
                                <div className="bg-warning bg-opacity-10 text-warning rounded-3 p-3">
                                    <FaMoneyBillWave size={22} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Job Listings */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Your Postings</h5>
                <small className="text-muted">
                    Manage and publish your jobs
                </small>
            </div>

            {loading ? (

                <div className="text-center py-5">
                    <div className="spinner-border text-primary"></div>
                    <p className="text-muted mt-3">Loading your jobs...</p>
                </div>

            ) : jobs?.length === 0 ? (

                <div className="card border-0 shadow-sm rounded-3">
                    <div className="card-body text-center py-5">
                        <FaBriefcase size={40} className="text-muted mb-3" />
                        <h5 className="fw-bold">No jobs posted yet</h5>
                        <p className="text-muted mb-0">
                            Your job postings will appear here once you create them.
                        </p>
                    </div>
                </div>

            ) : (

                <div className="row g-3">

                    {jobs?.map((job) => (

                        <div className="col-12" key={job._id}>

                            <div className="card border-0 shadow-sm rounded-3">

                                <div className="card-body p-4">

                                    <div className="row align-items-center g-3">

                                        {/* Job Information */}
                                        <div className="col-lg-8">

                                            <div className="d-flex flex-wrap align-items-center gap-2 mb-2">

                                                <h5 className="fw-bold mb-0">
                                                    {job.jobTitle}
                                                </h5>

                                                {job.paymentStatus === "paid" ? (
                                                    <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                                                        <FaCheckCircle className="me-1" />
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2">
                                                        Pending Payment
                                                    </span>
                                                )}

                                            </div>

                                            <div className="d-flex flex-wrap gap-3 text-muted small mb-3">

                                                <span>
                                                    <FaMapMarkerAlt className="me-1" />
                                                    {job.location}
                                                </span>

                                                <span>
                                                    <FaClock className="me-1" />
                                                    {job.experience}
                                                </span>

                                                <span>
                                                    <FaBriefcase className="me-1" />
                                                    {job.employmentType}
                                                </span>

                                            </div>

                                            <p className="text-muted mb-0" style={{ lineHeight: "1.7" }}>
                                                {job.jobDescription?.slice(0, 150)}
                                                {job.jobDescription?.length > 150 && "..."}
                                            </p>

                                        </div>

                                        {/* Actions */}
                                        <div className="col-lg-4">

                                            <div className="d-flex flex-column align-items-lg-end gap-2">

                                                {job.paymentStatus === "unpaid" ? (

                                                    <>
                                                        <button
                                                            className="btn btn-primary px-4 py-2 fw-semibold"
                                                            onClick={() => payJob(job._id)}
                                                        >
                                                            <FaMoneyBillWave className="me-2" />
                                                            Pay & Publish
                                                            <FaArrowRight className="ms-2" />
                                                        </button>

                                                        <small className="text-muted">
                                                            Complete payment to publish this job
                                                        </small>
                                                    </>

                                                ) : (

                                                    <span className="text-success fw-semibold">
                                                        <FaCheckCircle className="me-2" />
                                                        Successfully Published
                                                    </span>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default JobList;