import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        MediBook
      </Link>
      <nav className="navbar-links">
        <Link to="/">Find a Doctor</Link>
        <Link to="/appointments">My Appointments</Link>
      </nav>
    </header>
  );
}

export default Navbar;