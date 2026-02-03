import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function BillingDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="billing-dashboard-container">
        <Sidebar role="Billing" />

        <div className="billing-dashboard-content">
          <h1>Billing Dashboard</h1>
          <p>Welcome to the Billing Panel</p>

          <div className="billing-cards">
            <div className="billing-card">
              <h3>Create Bill</h3>
              <p>Generate new patient bills</p>
              <button onClick={() => navigate("/billing")}>
                Go to Billing
              </button>
            </div>

            <div className="billing-card">
              <h3>Billing Records</h3>
              <p>View previous billing details</p>
            </div>

            <div className="billing-card">
              <h3>Payments</h3>
              <p>Manage payment information</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BillingDashboard;
