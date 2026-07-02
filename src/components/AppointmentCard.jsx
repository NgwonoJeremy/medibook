// src/components/AppointmentCard.jsx
import "./AppointmentCard.jsx";

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

function AppointmentCard({ appointment, onCancel }) {
  return (
    <div className="appointment-card">
      <div>
        <h3>{appointment.doctorName}</h3>
        <p className="specialty">{appointment.specialty}</p>
        <p>📅 {formatSlot(appointment.slot)}</p>
        <p>👤 {appointment.patientName}</p>
        <p className="reason">" {appointment.reason}"</p>
      </div>
      <button className="cancel-btn" onClick={() => onCancel(appointment.id)}>
        Cancel
      </button>
    </div>
  );
}

export default AppointmentCard;