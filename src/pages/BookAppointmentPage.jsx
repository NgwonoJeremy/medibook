// src/pages/BookAppointmentPage.jsx
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import doctors from "../data/doctors";
import { useAppointments } from "../context/AppointmentsContext";

function formatSlot(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function BookAppointmentPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { bookAppointment } = useAppointments();
  const doctor = doctors.find((doc) => doc.id === doctorId);

  const [selectedSlot, setSelectedSlot] = useState("");
  const [patientName, setPatientName] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  if (!doctor) {
    return (
      <div className="page-container">
        <p>Doctor not found.</p>
        <Link to="/">Back to all doctors</Link>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!selectedSlot) {
      setError("Please select a time slot.");
      return;
    }
    if (!patientName.trim()) {
      setError("Please enter your name.");
      return;
    }

    const newAppointment = {
      id: `appt-${Date.now()}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      slot: selectedSlot,
      patientName: patientName.trim(),
      reason: reason.trim() || "General consultation",
    };

    bookAppointment(newAppointment);
    navigate("/appointments");
  }

  return (
    <div className="page-container">
      <Link to={`/doctors/${doctor.id}`} className="back-link">
        ← Back to {doctor.name}'s profile
      </Link>
      <h1>Book an Appointment</h1>
      <p className="specialty">with {doctor.name} · {doctor.specialty}</p>

      <form onSubmit={handleSubmit} className="booking-form">
        <label htmlFor="slot">Choose a time slot</label>
        <select
          id="slot"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          <option value="">-- Select a slot --</option>
          {doctor.availableSlots.map((slot) => (
            <option key={slot} value={slot}>
              {formatSlot(slot)}
            </option>
          ))}
        </select>

        <label htmlFor="name">Your full name</label>
        <input
          id="name"
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="e.g. John Mwangi"
        />

        <label htmlFor="reason">Reason for visit (optional)</label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g. Annual checkup, persistent cough..."
          rows={3}
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="book-btn">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
}

export default BookAppointmentPage;