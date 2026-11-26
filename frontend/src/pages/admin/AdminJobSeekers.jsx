import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AdminJobSeeker = () => {

    const backendLink = useSelector((state) => state.prod.link);

    const [jobseekers, setJobSeekers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchJobSeekers = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    `${backendLink}/api/v1/admin/all-users`,
                    {
                        withCredentials: true
                    }
                );

                setJobSeekers(
                    response?.data?.jobSeekerList || []
                );

            } catch (error) {

                toast.error(
                    error?.response?.data?.message ||
                    "Cannot fetch job seekers right now"
                );

            } finally {
                setLoading(false);
            }
        };

        fetchJobSeekers();

    }, [backendLink]);


    return (
        <div className="p-3">

            {/* Page Header */}
            <div className="mb-4">
                <h3 className="fw-bold mb-1">Job Seekers</h3>
                <p className="text-muted mb-0">
                    Manage registered candidates and their accounts on SkillBridge.
                </p>
            </div>


            {/* Summary Cards */}
            <div className="row g-3 mb-4">

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-3 h-100">
                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted small mb-2">
                                        Total Job Seekers
                                    </p>
                                    <h3 className="fw-bold mb-0">
                                        {jobseekers.length}
                                    </h3>
                                </div>

                                <div
                                    className="rounded-3 p-3"
                                    style={{
                                        backgroundColor: "#eaf1f8",
                                        color: "#133458"
                                    }}
                                >
                                    <i className="bi bi-people fs-4"></i>
                                </div>
                            </div>

                            <small className="text-muted d-block mt-3">
                                Registered candidate accounts
                            </small>

                        </div>
                    </div>
                </div>


                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-3 h-100">
                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted small mb-2">
                                        Active Accounts
                                    </p>
                                    <h3 className="fw-bold mb-0">
                                        {jobseekers.filter(
                                            seeker => !seeker.isSuspended
                                        ).length}
                                    </h3>
                                </div>

                                <div className="rounded-3 p-3 bg-success bg-opacity-10 text-success">
                                    <i className="bi bi-person-check fs-4"></i>
                                </div>
                            </div>

                            <small className="text-muted d-block mt-3">
                                Active candidate accounts
                            </small>

                        </div>
                    </div>
                </div>


                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-3 h-100">
                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted small mb-2">
                                        Suspended Accounts
                                    </p>
                                    <h3 className="fw-bold mb-0">
                                        {jobseekers.filter(
                                            seeker => seeker.isSuspended
                                        ).length}
                                    </h3>
                                </div>

                                <div className="rounded-3 p-3 bg-danger bg-opacity-10 text-danger">
                                    <i className="bi bi-person-x fs-4"></i>
                                </div>
                            </div>

                            <small className="text-muted d-block mt-3">
                                Suspended candidate accounts
                            </small>

                        </div>
                    </div>
                </div>

            </div>


            {/* Job Seekers Table */}
            <div className="card border-0 shadow-sm rounded-3">

                <div className="card-body p-0">

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 p-4 border-bottom">

                        <div>
                            <h5 className="fw-bold mb-1">
                                All Job Seekers
                            </h5>
                            <small className="text-muted">
                                View and manage registered candidate accounts.
                            </small>
                        </div>

                        <span
                            className="badge px-3 py-2 rounded-pill"
                            style={{
                                backgroundColor: "#eaf1f8",
                                color: "#133458"
                            }}
                        >
                            {jobseekers.length} Candidates
                        </span>

                    </div>


                    {loading ? (

                        <div className="text-center py-5">
                            <div className="spinner-border text-primary"></div>
                            <p className="text-muted mt-3 mb-0">
                                Loading job seekers...
                            </p>
                        </div>

                    ) : jobseekers.length > 0 ? (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead style={{ backgroundColor: "#f8fafc" }}>
                                    <tr>
                                        <th className="ps-4 py-3 text-muted small">
                                            #
                                        </th>

                                        <th className="py-3 text-muted small">
                                            CANDIDATE
                                        </th>

                                        <th className="py-3 text-muted small">
                                            EMAIL ADDRESS
                                        </th>

                                        <th className="py-3 text-muted small">
                                            PHONE NUMBER
                                        </th>

                                        <th className="py-3 text-muted small">
                                            STATUS
                                        </th>

                                        <th className="py-3 text-muted small text-end pe-4">
                                            ACTIONS
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {jobseekers.map((seeker, index) => (

                                        <tr key={seeker._id}>

                                            <td className="ps-4 text-muted">
                                                {index + 1}
                                            </td>

                                            <td>
                                                <div className="d-flex align-items-center gap-3">

                                                    <div
                                                        className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                                        style={{
                                                            width: "42px",
                                                            height: "42px",
                                                            minWidth: "42px",
                                                            backgroundColor: "#eaf1f8",
                                                            color: "#133458"
                                                        }}
                                                    >
                                                        {seeker.fullname?.charAt(0)?.toUpperCase()}
                                                    </div>

                                                    <div>
                                                        <div className="fw-semibold text-dark">
                                                            {seeker.fullname}
                                                        </div>
                                                        <small className="text-muted">
                                                            Job Seeker
                                                        </small>
                                                    </div>

                                                </div>
                                            </td>

                                            <td>
                                                <span className="text-muted">
                                                    {seeker.email}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="text-muted">
                                                    {seeker.phone || "Not provided"}
                                                </span>
                                            </td>

                                            <td>
                                                {seeker.isSuspended ? (
                                                    <span className="badge rounded-pill bg-danger bg-opacity-10 text-danger px-3 py-2">
                                                        Suspended
                                                    </span>
                                                ) : (
                                                    <span className="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-2">
                                                        Active
                                                    </span>
                                                )}
                                            </td>

                                            <td className="text-end pe-4">
                                                <div className="d-flex justify-content-end gap-2">

                                                    <button
                                                        className="btn btn-sm btn-outline-warning"
                                                        onClick={() => console.log("Suspend:", seeker._id)}
                                                    >
                                                        <i className="bi bi-person-slash me-1"></i>
                                                        {seeker.isSuspended ? "Activate" : "Suspend"}
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => console.log("Delete:", seeker._id)}
                                                    >
                                                        <i className="bi bi-trash me-1"></i>
                                                        Delete
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    ) : (

                        <div className="text-center py-5">
                            <i className="bi bi-people fs-1 text-muted"></i>
                            <h6 className="fw-bold mt-3">
                                No job seekers found
                            </h6>
                            <p className="text-muted mb-0">
                                Registered candidates will appear here.
                            </p>
                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default AdminJobSeeker;