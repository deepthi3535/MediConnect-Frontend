import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [editId, setEditId] = useState(null);

  // Load doctors from localStorage instead of backend
  const loadDoctors = () => {
    try {
      const stored = localStorage.getItem("doctors");
      if (stored) {
        setDoctors(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load doctors from localStorage.", err);
    }
  };

  const saveDoctors = (nextDoctors) => {
    setDoctors(nextDoctors);
    localStorage.setItem("doctors", JSON.stringify(nextDoctors));
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  // Add or Update Doctor (frontend-only)
  const handleSubmit = (e) => {
    e.preventDefault();

    const doctorData = { name, department };

    if (editId) {
      // UPDATE
      const nextDoctors = doctors.map((doctor) =>
        doctor._id === editId ? { ...doctor, ...doctorData } : doctor
      );
      saveDoctors(nextDoctors);
      alert("Doctor updated.");
    } else {
      // ADD
      const newDoctor = {
        _id: Date.now().toString(),
        ...doctorData,
      };
      const nextDoctors = [...doctors, newDoctor];
      saveDoctors(nextDoctors);
      alert("Doctor added.");
    }

    setName("");
    setDepartment("");
    setEditId(null);
  };

  // Edit button click
  const handleEdit = (doctor) => {
    setName(doctor.name);
    setDepartment(doctor.department);
    setEditId(doctor._id);
  };

  // Delete (frontend-only)
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete doctor?");
    if (!confirmed) return;

    const nextDoctors = doctors.filter((doctor) => doctor._id !== id);
    saveDoctors(nextDoctors);
    alert("Doctor deleted.");
  };

  return (
    <>
      <Header />
      <div className="admin-container">
        <Sidebar role="Admin" />

        <div className="admin-content">
          <h1>Doctors Management</h1>

          {/* Add / Edit Doctor Form */}
          <form className="form-card" onSubmit={handleSubmit}>
            <h3>{editId ? "Edit Doctor" : "Add Doctor"}</h3>

            <input
              placeholder="Doctor Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />

            <button type="submit">
              {editId ? "Update Doctor" : "Add Doctor"}
            </button>
          </form>

          {/* Doctors List */}
          <div className="card-container">
            {doctors.map((doctor) => (
              <div className="card" key={doctor._id}>
                <h3>{doctor.name}</h3>
                <p>Department: {doctor.department}</p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => handleEdit(doctor)}>Edit</button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(doctor._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Doctors;
