import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function DoctorDashboard() {
  return (
    <>
      <Header />
      <div className="doctor-dashboard-container">
        <Sidebar role="Doctor" />

        <div className="doctor-dashboard-content">
          <h1>Doctor Dashboard</h1>
          <p>Welcome Doctor</p>

          <div className="doctor-cards">
            <div className="doctor-card">
              <h3>My Appointments</h3>
              <p>View today’s scheduled appointments</p>
            </div>

            <div className="doctor-card">
              <h3>Patients</h3>
              <p>View assigned patient details</p>
            </div>

            <div className="doctor-card">
              <h3>Medical Records</h3>
              <p>Update diagnosis and prescriptions</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DoctorDashboard;
