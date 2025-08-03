// Mock data for doctors in the healthcare application
import type { Doctor } from "../types";

export const mockDoctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Alice Smith",
    specialization: "Cardiologist",
    image: "/close-up-health-worker (2).jpg",
    status: "Available Today",
    schedule: [
      { day: "Monday", slots: ["09:00", "09:30", "10:00"] },
      { day: "Tuesday", slots: ["11:00", "11:30"] },
    ],
  },
  {
    id: "d2",
    name: "Dr. Bob Johnson",
    specialization: "Dermatologist",
    image:
      "/portrait-professional-medical-worker-posing-picture-with-arms-folded.jpg",
    status: "Fully Booked",
    schedule: [{ day: "Wednesday", slots: ["14:00", "15:00"] }],
  },
  {
    id: "d3",
    name: "Dr. Carol Wang",
    specialization: "Pediatrician",
    image: "/close-up-health-worker (3).jpg",
    status: "On Leave",
    schedule: [],
  },
];
