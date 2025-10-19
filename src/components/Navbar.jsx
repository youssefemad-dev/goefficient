import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand fw-bold" to="/">goefficient</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/pomodoro">Pomodoro</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/todo">To-Do List</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/habits">Habits</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/notes">Notes</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/streaks">Streaks</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/focus-music">Focus Music</Link></li>
        </ul>
      </div>
    </nav>
  );
}
