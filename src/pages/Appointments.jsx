import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
  });

  // Load appointments from localStorage instead of backend
  const loadAppointments = () => {
    try {
      const stored = localStorage.getItem("appointments");
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load appointments from localStorage.", err);
    }
  };

  const saveAppointments = (nextAppointments) => {
    setAppointments(nextAppointments);
    localStorage.setItem("appointments", JSON.stringify(nextAppointments));
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add appointment (frontend-only)
  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      _id: Date.now().toString(),
      ...formData,
    };

    const nextAppointments = [...appointments, newAppointment];
    saveAppointments(nextAppointments);

    setFormData({
      patientName: "",
      doctorName: "",
      date: "",
      time: "",
    });

    alert("Appointment booked.");
  };

  // Delete appointment (frontend-only)
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (!confirmed) return;

    const nextAppointments = appointments.filter((app) => app._id !== id);
    saveAppointments(nextAppointments);
    alert("Appointment deleted.");
  };

  // Update appointment (frontend-only, simple prompt)
  const handleUpdate = (appointment) => {
    const newDoctor = prompt(
      "Enter new doctor name",
      appointment.doctorName
    );
    if (!newDoctor) return;

    const nextAppointments = appointments.map((app) =>
      app._id === appointment._id ? { ...app, doctorName: newDoctor } : app
    );
    saveAppointments(nextAppointments);
    alert("Appointment updated.");
  };

  return (
    <>
      <Header />
      <div className="appointments-container">
        <Sidebar role={localStorage.getItem("role") || "Admin"} />

        <div className="appointments-content">
          <h1>Appointments</h1>

          {/* Add Appointment */}
          <form className="appointment-form" onSubmit={handleSubmit}>
            <h3>Schedule Appointment</h3>

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
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />

            <button type="submit">Book Appointment</button>
          </form>

          {/* Appointment List */}
          <div className="appointment-list">
            <h3>Appointment List</h3>

            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((app) => (
                  <tr key={app._id}>
                    <td>{app.patientName}</td>
                    <td>{app.doctorName}</td>
                    <td>{app.date}</td>
                    <td>{app.time}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleUpdate(app)}>Edit</button>
                      <button onClick={() => handleDelete(app._id)}>
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

export default Appointments;
