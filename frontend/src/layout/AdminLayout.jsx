import DashboardNavBar from "../components/DashboardNavBar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { GrUserManager } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";




const AdminLayout = () => {

    const adminLinks = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: <AiOutlineDashboard />
        },
        {
            name: "Employers",
            path: "/admin/employers",
            icon: <GrUserManager />
        },
        {
            name: "Job Seekers",
            path: "/admin/job-seekers",
            icon: <FaUsers />
        },
        {
            name: "Jobs",
            path: "/admin/jobs",
            icon: <FaUsers />
        },
        {
            name: "Settings",
            path: "/admin/settings",
            icon: <FaCog />
        }
    ];

    return (
        <div>
            <div className="d-flex m-3">
                <div
                    className="card border-0 shadow-sm p-3 text-light"
                    style={{
                        backgroundColor: "#3368A0",
                        width: "300px",
                        minHeight: "90vh"
                    }}
                >
                    <SideBar links={adminLinks} title="Admin Dashboard" />
                </div>
                <div className="ms-3 flex-grow-1">
                    <div
                        className="card p-3 border-0 shadow-sm text-white"
                        style={{
                            width: "100%",
                            backgroundColor: "#66A3BF"
                        }}
                    >
                        <DashboardNavBar />
                    </div>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;