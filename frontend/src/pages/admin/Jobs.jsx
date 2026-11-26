import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Jobs = () => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const backendLink = useSelector((state) => state.prod.link);

    useEffect(() => {

        const fetchJobs = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    `${backendLink}/api/v1/admin/all-jobs`,
                    {
                        withCredentials: true
                    }
                );

                setJobs(response?.data?.allJobs || []);

            } catch (error) {

                toast.error(
                    error.response?.data?.message || "Failed to fetch jobs"
                );

            } finally {
                setLoading(false);
            }
        };

        fetchJobs();

    }, [backendLink]);


    return (
        <div className="p-3">

            {/* Page Header */}
            <div className="mb-4">
                <h3 className="fw-bold mb-1">Manage Jobs</h3>
                <p className="text-muted mb-0">
                    View and manage job opportunities posted on SkillBridge.
                </p>
            </div>

            {/* Section Header */}
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">

                <div>
                    <h5 className="fw-semibold mb-1">Posted Jobs</h5>
                    <small className="text-muted">
                        Review available opportunities and their details.
                    </small>
                </div>

                <button
                    className="btn btn-sm text-white"
                    style={{ backgroundColor: "#133458" }}
                >
                    All Jobs ({jobs.length})
                </button>

            </div>


            {/* Loading State */}
            {loading ? (

                <div className="text-center py-5">
                    <div className="spinner-border text-primary"></div>
                    <p className="text-muted mt-2">
                        Loading jobs...
                    </p>
                </div>

            ) : jobs.length > 0 ? (

                /* Jobs List */
                <div className="row g-3">

                    {jobs.map((job, index) => (

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

                                                {job.isPublished ? (
                                                    <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="badge bg-secondary bg-opacity-10 text-secondary px-3 py-2">
                                                        Unpublished
                                                    </span>
                                                )}

                                            </div>

                                            {/* Employer */}
                                            <div className="text-muted small mb-2">
                                                <i className="bi bi-building me-2"></i>
                                                {job?.companyName}
                                            </div>

                                            {/* Job Details */}
                                            <div className="d-flex flex-wrap gap-3 text-muted small mb-3">

                                                <span>
                                                    <i className="bi bi-geo-alt me-1"></i>
                                                    {job.location}
                                                </span>

                                                <span>
                                                    <i className="bi bi-clock me-1"></i>
                                                    {job.experience}
                                                </span>

                                                <span>
                                                    <i className="bi bi-briefcase me-1"></i>
                                                    {job.employmentType}
                                                </span>

                                            </div>

                                            {/* Description */}
                                            <p
                                                className="text-muted mb-0"
                                                style={{ lineHeight: "1.7" }}
                                            >
                                                {job.jobDescription?.slice(0, 150)}
                                                {job.jobDescription?.length > 150 && "..."}
                                            </p>

                                        </div>


                                        {/* Job Status and Actions */}
                                        <div className="col-lg-4">

                                            <div className="d-flex flex-column align-items-lg-end gap-3">

                                                <div>
                                                    <small className="text-muted d-block mb-1">
                                                        Payment Status
                                                    </small>

                                                    {job.paymentStatus === "paid" ? (
                                                        <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                                                            <i className="bi bi-check-circle me-1"></i>
                                                            Paid
                                                        </span>
                                                    ) : (
                                                        <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2">
                                                            <i className="bi bi-exclamation-circle me-1"></i>
                                                            Pending Payment
                                                        </span>
                                                    )}
                                                </div>

                                                <button
                                                    className="btn btn-outline-primary btn-sm px-4"
                                                    onClick={() => console.log("Selected job:", job._id)}
                                                >
                                                    View Details
                                                    <i className="bi bi-arrow-right ms-2"></i>
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                /* Empty State */
                <div className="border rounded-3 p-4 text-center">

                    <i className="bi bi-briefcase fs-1 text-muted"></i>

                    <h6 className="fw-semibold mt-3">
                        No jobs to display yet
                    </h6>

                    <p className="text-muted mb-0">
                        No jobs have been posted yet.
                    </p>

                </div>

            )}

        </div>
    );
};

export default Jobs;