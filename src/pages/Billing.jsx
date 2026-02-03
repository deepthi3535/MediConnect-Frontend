import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Billing() {
  const [bills, setBills] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    service: "",
    amount: "",
    paymentMethod: "",
  });

  // Load bills from localStorage instead of backend
  const loadBills = () => {
    try {
      const stored = localStorage.getItem("bills");
      if (stored) {
        setBills(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load bills from localStorage.", err);
    }
  };

  const saveBills = (nextBills) => {
    setBills(nextBills);
    localStorage.setItem("bills", JSON.stringify(nextBills));
  };

  useEffect(() => {
    loadBills();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add bill (frontend-only)
  const handleSubmit = (e) => {
    e.preventDefault();

    const newBill = {
      _id: Date.now().toString(),
      ...formData,
    };

    const nextBills = [...bills, newBill];
    saveBills(nextBills);

    setFormData({
      patientName: "",
      service: "",
      amount: "",
      paymentMethod: "",
    });

    alert("Bill generated successfully.");
  };

  // Delete bill (frontend-only)
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this bill?"
    );
    if (!confirmed) return;

    const nextBills = bills.filter((bill) => bill._id !== id);
    saveBills(nextBills);
    alert("Bill deleted.");
  };

  // Update bill (frontend-only, simple prompt)
  const handleUpdate = (bill) => {
    const newAmount = prompt("Enter new amount", bill.amount);
    if (!newAmount) return;

    const nextBills = bills.map((b) =>
      b._id === bill._id ? { ...b, amount: newAmount } : b
    );
    saveBills(nextBills);
    alert("Bill updated.");
  };

  return (
    <>
      <Header />
      <div className="billing-container">
        <Sidebar role={localStorage.getItem("role") || "Billing"} />

        <div className="billing-content">
          <h1>Billing</h1>

          {/* Billing Form */}
          <form className="billing-form" onSubmit={handleSubmit}>
            <h3>Create Bill</h3>

            <input
              type="text"
              name="patientName"
              placeholder="Patient Name"
              value={formData.patientName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="service"
              placeholder="Service"
              value={formData.service}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Select Payment Method</option>
              <option>Cash</option>
              <option>Card</option>
              <option>UPI</option>
            </select>

            <button type="submit">Generate Bill</button>
          </form>

          {/* Billing List */}
          <div className="billing-list">
            <h3>Billing Records</h3>

            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill._id}>
                    <td>{bill.patientName}</td>
                    <td>{bill.service}</td>
                    <td>₹{bill.amount}</td>
                    <td>{bill.paymentMethod}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleUpdate(bill)}>Edit</button>
                      <button onClick={() => handleDelete(bill._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Billing;
