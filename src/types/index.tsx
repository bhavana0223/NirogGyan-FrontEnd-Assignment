export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  image: string;
  status: "Available Today" | "Fully Booked" | "On Leave";
  schedule: { day: string; slots: string[] }[];
}

export interface AppointmentPayload {
  doctorId: string;
  patientName: string;
  patientEmail: string;
  date: string; // YYYY-MM-DD
  time: string;
}