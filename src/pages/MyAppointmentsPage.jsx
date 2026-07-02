// src/pages/MyAppointmentsPage.jsx
import { Link } from "react-router-dom";
import { useAppointments } from "../context/AppointmentsContext";
import AppointmentCard from "../components/AppointmentCard";

function MyAppointmentsPage() {
  const { appointments, cancelAppointment } = useAppointments();

  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(a.slot) - new Date(b.slot)
  );

  function handleCancel(appointmentId) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (confirmed) {
      cancelAppointment(appointmentId);
    }
  }

  return (
    <div className="page-container">
      <h1>My Appointments</h1>
      {sortedAppointments.length === 0 ? (
        <div className="empty-state">
          <p>You have no upcoming appointments.</p>
          <Link to="/" className="book-btn">
            Find a Doctor
          </Link>
        </div>
      ) : (
        sortedAppointments.map((appt) => (
          <AppointmentCard
            key={appt.id}
            appointment={appt}
            onCancel={handleCancel}
          />
        ))
      )}
    </div>
  );
}

export default MyAppointmentsPage;