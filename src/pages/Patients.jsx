import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
  });

  // 🔹 Load patients from localStorage instead of backend
  const loadPatients = () => {
    try {
      const stored = localStorage.getItem("patients");
      if (stored) {
        setPatients(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load patients from localStorage.", err);
    }
  };

  const savePatients = (nextPatients) => {
    setPatients(nextPatients);
    localStorage.setItem("patients", JSON.stringify(nextPatients));
  };

  // 🔹 Load patients on page load
  useEffect(() => {
    loadPatients();
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Add patient (frontend-only)
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPatient = {
      _id: Date.now().toString(),
      ...formData,
    };

    const nextPatients = [...patients, newPatient];
    savePatients(nextPatients);

    setFormData({
      name: "",
      age: "",
      gender: "",
      contact: "",
    });

    alert("Patient added successfully.");
  };

  // 🔹 DELETE patient (frontend-only)
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete patient?");
    if (!confirmed) return;

    const nextPatients = patients.filter((p) => p._id !== id);
    savePatients(nextPatients);
    alert("Patient deleted.");
  };

  // 🔹 UPDATE patient (frontend-only)
  const handleUpdate = (patient) => {
    const newName = prompt("Enter new name", patient.name);
    if (!newName) return;

    const nextPatients = patients.map((p) =>
      p._id === patient._id ? { ...p, name: newName } : p
    );
    savePatients(nextPatients);
    alert("Patient updated.");
  };


  return (
    <>
      <Header />
      <div className="patients-container">
        <Sidebar role={localStorage.getItem("role") || "Admin"} />

        <div className="patients-content">
          <h1>Patient Management</h1>

          {/* Add Patient Form */}
          <form className="patient-form" onSubmit={handleSubmit}>
            <h3>Add Patient</h3>

            <input
              type="text"
              name="name"
              placeholder="Patient Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
            />

            <button type="submit">Add Patient</button>
          </form>

          {/* Patient List */}
          <div className="patient-list">
            <h3>Patient List</h3>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient._id}>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.contact}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleUpdate(patient)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(patient._id)}>
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

export default Patients;
