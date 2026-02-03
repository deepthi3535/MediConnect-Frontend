import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User"
  );
  const [role] = useState(localStorage.getItem("role") || "Staff");
  const [email, setEmail] = useState(
    localStorage.getItem("email") || "Not available"
  );

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileForm, setProfileForm] = useState({
    username,
    email: email === "Not available" ? "" : email,
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const trimmedUsername = profileForm.username.trim();
    const trimmedEmail = profileForm.email.trim();

    if (!trimmedUsername) {
      alert("Username cannot be empty.");
      return;
    }

    setUsername(trimmedUsername);
    setEmail(trimmedEmail || "Not available");
    localStorage.setItem("username", trimmedUsername);
    if (trimmedEmail) {
      localStorage.setItem("email", trimmedEmail);
    }

    setIsEditingProfile(false);
    alert("Profile updated locally (UI only).");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsChangingPassword(false);
    alert(
      "Password change request simulated (UI only, no backend changes made)."
    );
  };

  const handleBackToDashboard = () => {
    const roleFromStorage = localStorage.getItem("role") || role;
    if (roleFromStorage === "Admin") navigate("/admin");
    else if (roleFromStorage === "Doctor") navigate("/doctor");
    else if (roleFromStorage === "Nurse") navigate("/nurse");
    else if (roleFromStorage === "Billing") navigate("/billing-dashboard");
    else navigate("/");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <span>{username.charAt(0).toUpperCase()}</span>
        </div>
        <h2 className="profile-name">{username}</h2>
        <p className="profile-role">{role}</p>

        <button
          type="button"
          className="btn-secondary profile-back-btn"
          onClick={handleBackToDashboard}
        >
          ← Back to dashboard
        </button>

        <div className="profile-info">
          <div className="profile-row">
            <span className="label">Username</span>
            <span className="value">{username}</span>
          </div>
          <div className="profile-row">
            <span className="label">Role</span>
            <span className="value">{role}</span>
          </div>
          <div className="profile-row">
            <span className="label">Email</span>
            <span className="value">{email}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setIsChangingPassword(false);
              setIsEditingProfile(true);
            }}
          >
            Edit Profile
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setIsEditingProfile(false);
              setIsChangingPassword(true);
            }}
          >
            Change Password
          </button>
        </div>

        {isEditingProfile && (
          <form className="profile-edit-form" onSubmit={handleProfileSubmit}>
            <h3>Edit Profile</h3>
            <label className="profile-field">
              Username
              <input
                name="username"
                value={profileForm.username}
                onChange={handleProfileChange}
              />
            </label>
            <label className="profile-field">
              Email
              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                placeholder="Enter email (optional)"
              />
            </label>
            <div className="profile-edit-actions">
              <button type="submit" className="btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsEditingProfile(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {isChangingPassword && (
          <form
            className="profile-edit-form"
            onSubmit={handlePasswordSubmit}
          >
            <h3>Change Password</h3>
            <label className="profile-field">
              Current Password
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
              />
            </label>
            <label className="profile-field">
              New Password
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
              />
            </label>
            <label className="profile-field">
              Confirm New Password
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
              />
            </label>
            <div className="profile-edit-actions">
              <button type="submit" className="btn-primary">
                Update Password
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsChangingPassword(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;

