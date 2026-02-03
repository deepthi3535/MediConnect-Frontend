import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function NurseDashboard() {
  return (
    <>
      <Header />
      <div className="nurse-dashboard-container">
        <Sidebar role="Nurse" />

        <div className="nurse-dashboard-content">
          <h1>Nurse Dashboard</h1>
          <p>Welcome Nurse</p>

          <div className="nurse-cards">
            <div className="nurse-card">
              <h3>Patient Care</h3>
              <p>Monitor patient vitals and care details</p>
            </div>

            <div className="nurse-card">
              <h3>Appointments</h3>
              <p>Assist doctors during appointments</p>
            </div>

            <div className="nurse-card">
              <h3>Medical Records</h3>
              <p>View patient medical history</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NurseDashboard;
