/** @jsxImportSource react */
import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import type { Doctor } from "../types";

interface Props {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: Props) => {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <Card className="h-100">
        <Card.Img variant="top" src={doctor.image} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{doctor.name}</Card.Title>
          <Card.Text>{doctor.specialization}</Card.Text>
          <Badge
            bg={
              doctor.status === "Available Today"
                ? "success"
                : doctor.status === "Fully Booked"
                ? "warning"
                : "secondary"
            }
            className="mb-2"
          >
            {doctor.status}
          </Badge>
          <LinkContainer to={`/doctors/${doctor.id}`} className="mt-auto">
            <Button size="sm" variant="primary">
              View Profile
            </Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DoctorCard;
