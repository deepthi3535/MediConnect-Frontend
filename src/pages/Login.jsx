import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Carousel from "../components/Carousel";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Please select a role to continue.");
      return;
    }

    try {
      setLoading(true);
      // Frontend-only demo login: accept any username/password with a role.
      // No backend or real credentials are used.
      const demoToken = "demo-token";

      localStorage.setItem("token", demoToken);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      if (role === "Admin") navigate("/admin");
      else if (role === "Doctor") navigate("/doctor");
      else if (role === "Nurse") navigate("/nurse");
      else if (role === "Billing") navigate("/billing-dashboard");
      else {
        setError("Your role is not recognized in this application.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="public-navbar">
        <button
          type="button"
          className="public-brand"
          onClick={() => navigate("/")}
        >
          MediConnect
        </button>
      </div>

      <div className="login-wrapper">
        <div className="carousel-section">
          <Carousel />
        </div>

        <div className="login-section">
          <div className="login-card">
            <h2 className="login-title">MediConnect</h2>
            <p className="login-subtitle">
              Sign in with your staff credentials to access your hospital
              dashboard.
            </p>

            {error && <p className="login-error">{error}</p>}

            <form className="login-form" onSubmit={handleLogin}>
              <label className="login-label">
                Username
                <input
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>

              <label className="login-label">
                Password
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              <label className="login-label">
                Role
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select role</option>
                  <option>Admin</option>
                  <option>Doctor</option>
                  <option>Nurse</option>
                  <option>Billing</option>
                </select>
              </label>

              <button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
