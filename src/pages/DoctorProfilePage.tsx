/** @jsxImportSource react */
import React from "react";
import { useParams, Link } from "react-router-dom";
import { mockDoctors } from "../data/mockDoctors";
import { Button, ListGroup } from "react-bootstrap";
import type { Doctor } from "../types";

const DoctorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const doctor = mockDoctors.find((d: Doctor) => d.id === id);

  if (!doctor) return <p className="text-danger">Doctor not found</p>;

  return (
    <>
      <h2>{doctor.name}</h2>
      <p className="text-muted">{doctor.specialization}</p>
      <img
        src={doctor.image}
        alt={doctor.name}
        className="rounded mb-3"
        width={180}
      />
      <h5 className="mt-4">Schedule</h5>
      <ListGroup className="mb-4">
        {doctor.schedule.map((s) => (
          <ListGroup.Item key={s.day}>
            <strong>{s.day}:</strong> {s.slots.join(", ")}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Link to={`/doctors/${doctor.id}/book`}>
        <Button variant="success">Book Appointment</Button>
      </Link>
    </>
  );
};

export default DoctorProfilePage;
