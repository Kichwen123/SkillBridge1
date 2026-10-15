import SideBar from "../components/SideBar";
import { AiFillDashboard } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import { MdHelp } from "react-icons/md";
import { Outlet } from "react-router-dom";
import DashboardNavBar from "../components/DashboardNavBar";

const JobSeekerLayout = () => {
    const SeekerLinks = [
        {
            name: "Dashboard",
            path: "/job-seeker",
            icon: <AiFillDashboard />
        },
        {
            name: "Applications",
            path: "/job-seeker/application",
            icon: <FaPen />
        },
        {
            name: "My Skills",
            path: "/job-seeker/skills",
            icon: <FaGraduationCap />
        },
        {
            name: "Settings",
            path: "/job-seeker/settings",
            icon: <MdOutlineSettings />
        },
        {
            name: "Help",
            path: "/job-seeker/help",
            icon: <MdHelp />
        }
    ];

    return (
        <div className="d-flex m-3">
            <aside
                className="card border-0 shadow-sm p-3 text-light"
                style={{
                    backgroundColor: "#5C7057",
                    width: "300px",
                    minHeight: "90vh"
                }}
            >
                <SideBar links={SeekerLinks} title="Job Seeker Dashboard" />
            </aside>
            <main className="ms-3 flex-grow-1">
                <div
                    className="card p-3 border-0 shadow-sm text-white"
                    style={{
                        width: "100%",
                        backgroundColor: "#89A482"
                    }}
                >
                    <DashboardNavBar role="Job Seeker" />
                </div>
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default JobSeekerLayout;