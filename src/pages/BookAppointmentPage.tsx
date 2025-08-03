/** @jsxImportSource react */
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockDoctors } from "../data/mockDoctors";
import { Form, Button, Alert } from "react-bootstrap";


interface FormData {
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
}

interface FormErrors {
  patientName?: string;
  patientEmail?: string;
  date?: string;
  time?: string;
}

const BookAppointmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // All hooks must be called before any conditional returns
  const [form, setForm] = useState<FormData>({
    patientName: "",
    patientEmail: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const doctor = mockDoctors.find((d) => d.id === id);

  if (!doctor) return <p className="text-danger">Doctor not found</p>;

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) {
      return "Patient name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters long";
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return "Name should only contain letters and spaces";
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return "Email address is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }
    return undefined;
  };

  const validateDate = (date: string): string | undefined => {
    if (!date) {
      return "Appointment date is required";
    }
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return "Appointment date cannot be in the past";
    }

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3); // Allow booking up to 3 months ahead

    if (selectedDate > maxDate) {
      return "Appointments can only be booked up to 3 months in advance";
    }

    return undefined;
  };

  const validateTime = (time: string): string | undefined => {
    if (!time) {
      return "Please select an available time slot";
    }
    return undefined;
  };

  // Validate all fields
  const validateForm = (): FormErrors => {
    return {
      patientName: validateName(form.patientName),
      patientEmail: validateEmail(form.patientEmail),
      date: validateDate(form.date),
      time: validateTime(form.time),
    };
  };

  // Handle field changes with real-time validation
  const handleFieldChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle field blur for touched state
  const handleFieldBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate field on blur
    let fieldError: string | undefined;
    switch (field) {
      case "patientName":
        fieldError = validateName(form.patientName);
        break;
      case "patientEmail":
        fieldError = validateEmail(form.patientEmail);
        break;
      case "date":
        fieldError = validateDate(form.date);
        break;
      case "time":
        fieldError = validateTime(form.time);
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: fieldError }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched
    setTouched({
      patientName: true,
      patientEmail: true,
      date: true,
      time: true,
    });

    // Validate all fields
    const formErrors = validateForm();
    setErrors(formErrors);

    // Check if there are any errors
    const hasErrors = Object.values(formErrors).some(
      (error) => error !== undefined
    );

    if (hasErrors) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // simulate save
      console.log({ doctorId: doctor.id, ...form });
      alert("Appointment booked successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Get maximum date (3 months from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <div className="container mt-4">
      <h1>Book Appointment with Dr. {doctor.name}</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Doctor Information</h5>
              <p>
                <strong>Specialty:</strong> {doctor.specialization}
              </p>
              <p>
                <strong>Status:</strong> {doctor.status}
              </p>
              <div className="mb-3">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="img-thumbnail"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Appointment Details</h5>

              {/* Show general error if form has errors */}
              {Object.values(errors).some((error) => error) && (
                <Alert variant="danger">
                  Please correct the errors below before submitting.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Patient Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.patientName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleFieldChange("patientName", e.target.value)
                    }
                    onBlur={() => handleFieldBlur("patientName")}
                    isInvalid={touched.patientName && !!errors.patientName}
                    isValid={
                      touched.patientName &&
                      !errors.patientName &&
                      !!form.patientName.trim()
                    }
                    placeholder="Enter your full name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.patientName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    value={form.patientEmail}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleFieldChange("patientEmail", e.target.value)
                    }
                    onBlur={() => handleFieldBlur("patientEmail")}
                    isInvalid={touched.patientEmail && !!errors.patientEmail}
                    isValid={
                      touched.patientEmail &&
                      !errors.patientEmail &&
                      !!form.patientEmail.trim()
                    }
                    placeholder="Enter your email address"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.patientEmail}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Appointment Date *</Form.Label>
                  <Form.Control
                    type="date"
                    value={form.date}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleFieldChange("date", e.target.value)
                    }
                    onBlur={() => handleFieldBlur("date")}
                    isInvalid={touched.date && !!errors.date}
                    isValid={touched.date && !errors.date && !!form.date}
                    min={getMinDate()}
                    max={getMaxDate()}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.date}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Select a date within the next 3 months
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Available Time Slots *</Form.Label>
                  <Form.Select
                    value={form.time}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleFieldChange("time", e.target.value)
                    }
                    onBlur={() => handleFieldBlur("time")}
                    isInvalid={touched.time && !!errors.time}
                    isValid={touched.time && !errors.time && !!form.time}
                  >
                    <option value="">Select a time slot</option>
                    {doctor.schedule
                      .flatMap((s) =>
                        s.slots.map((t: string) => `${s.day} ${t}`)
                      )
                      .map((slot: string) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.time}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Booking..." : "Book Appointment"}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate(`/doctors/${doctor.id}`)}
                    disabled={isSubmitting}
                  >
                    Back to Doctor Profile
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
