import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AdminDashboard() {
  return (
    <>
      <Header />
      <div className="admin-container">
        <Sidebar role="Admin" />
        <div className="admin-content">
          <h1>Admin Dashboard</h1>

          <div className="card-container">
            <div className="card">
              <h3>Total Patients</h3>
              <p>120</p>
            </div>

            <div className="card">
              <h3>Appointments</h3>
              <p>35</p>
            </div>

            <div className="card">
              <h3>Doctors</h3>
              <p>15</p>
            </div>

            <div className="card">
              <h3>Billing Records</h3>
              <p>50</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;
