import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    diagnosis: "",
    prescription: "",
  });

  // 🔹 Load medical records from localStorage instead of backend
  const loadRecords = () => {
    try {
      const stored = localStorage.getItem("medicalRecords");
      if (stored) {
        setRecords(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load medical records from localStorage.", err);
    }
  };

  const saveRecords = (nextRecords) => {
    setRecords(nextRecords);
    localStorage.setItem("medicalRecords", JSON.stringify(nextRecords));
  };

  useEffect(() => {
    loadRecords();
  }, []);

  // 🔹 Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Add medical record (frontend-only)
  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      _id: Date.now().toString(),
      ...formData,
    };

    const nextRecords = [...records, newRecord];
    saveRecords(nextRecords);

    setFormData({
      patientName: "",
      doctorName: "",
      diagnosis: "",
      prescription: "",
    });

    alert("Medical record saved.");
  };

  // 🔹 Delete record (frontend-only)
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmed) return;

    const nextRecords = records.filter((record) => record._id !== id);
    saveRecords(nextRecords);
    alert("Record deleted.");
  };

  // 🔹 Update record (frontend-only, simple prompt)
  const handleUpdate = (record) => {
    const newDiagnosis = prompt(
      "Update Diagnosis",
      record.diagnosis
    );
    if (!newDiagnosis) return;

    const nextRecords = records.map((r) =>
      r._id === record._id ? { ...r, diagnosis: newDiagnosis } : r
    );
    saveRecords(nextRecords);
    alert("Record updated.");
  };

  return (
    <>
      <Header />
      <div className="medical-container">
        <Sidebar role={localStorage.getItem("role") || "Doctor"} />

        <div className="medical-content">
          <h1>Medical Records</h1>

          {/* Add Record */}
          <form className="medical-form" onSubmit={handleSubmit}>
            <h3>Add Medical Record</h3>

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
              name="doctorName"
              placeholder="Doctor Name"
              value={formData.doctorName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="diagnosis"
              placeholder="Diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="prescription"
              placeholder="Prescription"
              value={formData.prescription}
              onChange={handleChange}
              required
            />

            <button type="submit">Save Record</button>
          </form>

          {/* Record List */}
          <div className="medical-list">
            <h3>Medical Records List</h3>

            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Diagnosis</th>
                  <th>Prescription</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record._id}>
                    <td>{record.patientName}</td>
                    <td>{record.doctorName}</td>
                    <td>{record.diagnosis}</td>
                    <td>{record.prescription}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleUpdate(record)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(record._id)}>
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

export default MedicalRecords;
