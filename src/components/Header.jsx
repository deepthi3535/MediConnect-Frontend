import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const { username, role } = useMemo(() => {
    const storedUsername = localStorage.getItem("username") || "User";
    const storedRole = localStorage.getItem("role") || "Staff";

    return {
      username: storedUsername,
      role: storedRole,
    };
  }, []);

  const profilePathMap = {
    Admin: "/admin/profile",
    Doctor: "/doctor/profile",
    Nurse: "/nurse/profile",
    Billing: "/billing/profile",
    Staff: "/admin/profile",
  };

  const handleProfileClick = () => {
    const target = profilePathMap[role] || "/admin/profile";
    navigate(target);
  };

  return (
    <header className="app-header">
      <div className="app-header-left">
        <span className="app-logo-mark">M</span>
        <div className="app-header-text">
          <h1>MediConnect</h1>
          <p>Secure care for every patient</p>
        </div>
      </div>

      <div className="app-header-right">
        <div className="user-meta">
          <span className="user-name">{username}</span>
          <span className="user-role">{role}</span>
        </div>
        <button
          type="button"
          className="profile-pill"
          onClick={handleProfileClick}
          aria-label="Open profile"
        >
          <span className="profile-initial">
            {username.charAt(0).toUpperCase()}
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;

