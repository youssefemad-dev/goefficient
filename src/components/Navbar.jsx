import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./navbar.css";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="d-flex align-items-center">
        <img src="/icon.png" alt="Logo" className="navbar-logo" />
        <Link className="navbar-brand fw-bold" to="/">GoEfficient</Link>
      </div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {isAuthenticated ? (
          <>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link link" to="/timer">Pomodoro</Link></li>
              <li className="nav-item"><Link className="nav-link link" to="/todo">To-Do List</Link></li>
              <li className="nav-item"><Link className="nav-link link" to="/habits">Habits</Link></li>
              <li className="nav-item"><Link className="nav-link link" to="/notes">Notes</Link></li>
              <li className="nav-item"><Link className="nav-link link" to="/streaks">Streaks</Link></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {user?.name || 'Account'}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            </ul>
          </>
        ) : (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link link" to="/login">Login</Link></li>
            <li className="nav-item"><Link className="nav-link link" to="/register">Sign Up</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
}
