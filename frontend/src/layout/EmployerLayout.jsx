import { AiFillDashboard } from "react-icons/ai";
import { MdCreate } from "react-icons/md";
import { VscGitStashApply } from "react-icons/vsc";
import { IoSettings } from "react-icons/io5";
import SideBar from "../components/SideBar";
import DashboardNavBar from "../components/DashboardNavBar";
import { Outlet } from "react-router-dom";

const EmployerLayout = () => {
  const employerLinks = [
    { name: "Dashboard", path: "/employer", icon: <AiFillDashboard /> },
    { name: "Post-job", path: "/employer/create-job", icon: <MdCreate /> },
    { name: "Applicants", path: "/employer/applicants", icon: <VscGitStashApply /> },
    { name: "Settings", path: "/employer/settings", icon: <IoSettings /> },
  ];

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
      <div className="d-flex flex-grow-1 p-3 gap-3">
        {/* Sidebar with Accent Color */}
        <div
          className="card border-0 shadow-sm p-3 text-white"
          style={{
            backgroundColor: "#D98327",
            width: "300px",
            minHeight: "90vh",
          }}
        >
          <SideBar links={employerLinks} title="Employer Dashboard" />
        </div>

        {/* Main Content Area */}
        <div className="flex-grow-1 d-flex flex-column gap-3">
          {/* Top Navbar */}
          <div
            className="card border-0 shadow-sm p-3"
            style={{
              backgroundColor: "#FFFFFF", // Light background for navbar gives balance
            }}
          >
            <DashboardNavBar />
          </div>

          {/* Router View Content */}
          <div className="p-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerLayout;