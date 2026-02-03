import { Link, useNavigate } from "react-router-dom";

function Sidebar({ role }) {
  const navigate = useNavigate();
  const currentRole = role || localStorage.getItem("role") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2>{currentRole} Panel</h2>

      <nav>
        {currentRole === "Admin" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/patients">Patients</Link>
            <Link to="/appointments">Appointments</Link>
            <Link to="/billing">Billing</Link>
            <Link to="/medical-records">Medical Records</Link>
            <Link to="/admin/doctors">Doctors</Link>
          </>
        )}

        {currentRole === "Doctor" && (
          <>
            <Link to="/doctor">Dashboard</Link>
            <Link to="/appointments">Appointments</Link>
            <Link to="/medical-records">Medical Records</Link>
          </>
        )}

        {currentRole === "Nurse" && (
          <>
            <Link to="/nurse">Dashboard</Link>
            <Link to="/patients">Patients</Link>
            <Link to="/appointments">Appointments</Link>
            <Link to="/medical-records">Medical Records</Link>
          </>
        )}

        {currentRole === "Billing" && (
          <>
            <Link to="/billing-dashboard">Dashboard</Link>
            <Link to="/billing">Billing</Link>
          </>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;