import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.JSX";
import MusicPlayer from "./components/MusicPlayer.jsx";
import { MusicProvider } from "./context/MusicContext";
import PomodoroTime from "./pages/timer.jsx";
function App() {
  return (
    <MusicProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timer" element={<PomodoroTime />} />
        </Routes>
        <MusicPlayer />
      </div>
    </MusicProvider>
  );
}

export default App;
