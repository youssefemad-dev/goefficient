import React from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";

import { MusicProvider } from "./context/MusicContext";
import { HabitProvider } from "./context/HabitContext";
import HabitPage from "./pages/HabitPage";

function App() {
  return (
    <MusicProvider>
      <HabitProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/habits" element={<HabitPage />} />
        </Routes>

        <MusicPlayer />
      </HabitProvider>
    </MusicProvider>
  );
}

export default App;
