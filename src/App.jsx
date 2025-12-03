import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import HabitPage from "./pages/HabitPage.jsx";
import StreaksPage from "./pages/StreaksPage.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import TodoPage from "./pages/TodoPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { MusicProvider } from "./context/MusicContext";
import { HabitProvider } from "./context/HabitContext";
import { NotesProvider } from "./context/NotesContext";
import { TodoProvider } from "./context/TodoContext";
import { AuthProvider } from "./context/AuthContext";
import PomodoroTime from "./pages/timer.jsx";

function App() {
  return (
    <AuthProvider>
      <MusicProvider>
        <HabitProvider>
          <NotesProvider>
            <TodoProvider>
              <div>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/timer"
                    element={
                      <ProtectedRoute>
                        <PomodoroTime />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/habits"
                    element={
                      <ProtectedRoute>
                        <HabitPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notes"
                    element={
                      <ProtectedRoute>
                        <NotesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/todo"
                    element={
                      <ProtectedRoute>
                        <TodoPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/streaks"
                    element={
                      <ProtectedRoute>
                        <StreaksPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
                <MusicPlayer />
              </div>
            </TodoProvider>
          </NotesProvider>
        </HabitProvider>
      </MusicProvider>
    </AuthProvider>
  );
}

export default App;

