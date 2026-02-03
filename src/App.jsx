import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import NurseDashboard from "./pages/NurseDashboard";
import BillingDashboard from "./pages/BillingDashboard";
import Billing from "./pages/Billing";
import MedicalRecords from "./pages/MedicalRecords";
// Temporary pages (we will design later)
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";
import Profile from "./pages/Profile";

function RequireAuth({ allowedRoles, children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Role-based Dashboards */}
        <Route
          path="/admin"
          element={
            <RequireAuth allowedRoles={["Admin"]}>
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/doctor"
          element={
            <RequireAuth allowedRoles={["Doctor"]}>
              <DoctorDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/nurse"
          element={
            <RequireAuth allowedRoles={["Nurse"]}>
              <NurseDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/billing-dashboard"
          element={
            <RequireAuth allowedRoles={["Billing"]}>
              <BillingDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/billing"
          element={
            <RequireAuth allowedRoles={["Admin", "Billing"]}>
              <Billing />
            </RequireAuth>
          }
        />
        <Route
          path="/medical-records"
          element={
            <RequireAuth allowedRoles={["Admin", "Doctor", "Nurse"]}>
              <MedicalRecords />
            </RequireAuth>
          }
        />
        {/* Admin sidebar pages */}
        <Route
          path="/patients"
          element={
            <RequireAuth allowedRoles={["Admin", "Nurse"]}>
              <Patients />
            </RequireAuth>
          }
        />
        <Route
          path="/appointments"
          element={
            <RequireAuth allowedRoles={["Admin", "Doctor", "Nurse"]}>
              <Appointments />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/doctors"
          element={
            <RequireAuth allowedRoles={["Admin"]}>
              <Doctors />
            </RequireAuth>
          }
        />
        {/* Profile pages for all roles */}
        <Route
          path="/admin/profile"
          element={
            <RequireAuth allowedRoles={["Admin"]}>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/doctor/profile"
          element={
            <RequireAuth allowedRoles={["Doctor"]}>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/nurse/profile"
          element={
            <RequireAuth allowedRoles={["Nurse"]}>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/billing/profile"
          element={
            <RequireAuth allowedRoles={["Billing"]}>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
