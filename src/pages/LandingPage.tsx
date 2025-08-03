/** @jsxImportSource react */
import React, { useState, ChangeEvent } from "react";
import { mockDoctors } from "../data/mockDoctors";
import DoctorCard from "../components/DoctorCard";
import type { Doctor } from "../types";

const LandingPage = () => {
  const [query, setQuery] = useState("");

  const filtered = mockDoctors.filter(
    (d: Doctor) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialization.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <h2 className="mb-4">Find a Doctor</h2>
      <input
        className="form-control mb-4"
        placeholder="Search by name or specialization..."
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />
      <div className="row g-4">
        {filtered.map((doc: Doctor) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </>
  );
};

export default LandingPage;
