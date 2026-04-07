import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Weather from "./pages/Weather";
import Irrigation from "./pages/Irrigation";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">

        <h1 className="title">🌱 Smart Agriculture System</h1>

        {/* Navigation */}
        <nav className="navbar">
          <Link to="/">Dashboard</Link>
          <Link to="/weather">Weather</Link>
          <Link to="/irrigation">Irrigation</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/irrigation" element={<Irrigation />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;