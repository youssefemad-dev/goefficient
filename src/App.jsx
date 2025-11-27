import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import HabitPage from "./pages/HabitPage.jsx";
import StreaksPage from "./pages/StreaksPage.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import TodoPage from "./pages/TodoPage.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import { MusicProvider } from "./context/MusicContext";
import { HabitProvider } from "./context/HabitContext";
import { NotesProvider } from "./context/NotesContext";
import { TodoProvider } from "./context/TodoContext";
import PomodoroTime from "./pages/timer.jsx";

function App() {
  return (
    <MusicProvider>
      <HabitProvider>
        <NotesProvider>
          <TodoProvider>
            <div>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/timer" element={<PomodoroTime />} />
                <Route path="/habits" element={<HabitPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/todo" element={<TodoPage />} />
                <Route path="/streaks" element={<StreaksPage />} />
              </Routes>
              <MusicPlayer />
            </div>
          </TodoProvider>
        </NotesProvider>
      </HabitProvider>
    </MusicProvider>
  );
}

export default App;
