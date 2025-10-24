import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand fw-bold" to="/">goefficient</Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link link" to="/pomodoro">Pomodoro</Link></li>
          <li className="nav-item"><Link className="nav-link link" to="/todo">To-Do List</Link></li>
          <li className="nav-item"><Link className="nav-link link" to="/habits">Habits</Link></li>
          <li className="nav-item"><Link className="nav-link link" to="/notes">Notes</Link></li>
          <li className="nav-item"><Link className="nav-link link" to="/streaks">Streaks</Link></li>
          <li className="nav-item"><Link className="nav-link link" to="/focus-music">Focus Music</Link></li>
        </ul>
      </div>
    </nav>
  );
}
