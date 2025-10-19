import { Routes, Route, Link, Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home.jsx';
import Navbar from "./components/Navbar.JSX";
function App() {
  return (
<div>
  <Navbar />
  <Routes>
    <Route path='/' element={<Home/>}/>
  </Routes>
</div>
  )
}

export default App
