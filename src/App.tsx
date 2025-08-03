/** @jsxImportSource react */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import LandingPage from "./pages/LandingPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import BookAppointmentPage from "./pages/BookAppointmentPage";

function App() {
  return (
    <Router>
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctors/:id" element={<DoctorProfilePage />} />
          <Route path="/doctors/:id/book" element={<BookAppointmentPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
