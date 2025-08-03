# Healthcare Frontend Application

A modern healthcare appointment booking system built with React and TypeScript. This application allows patients to book appiontment of doctors.


## TypeScript Configuration

This project uses TypeScript with strict type checking. Key configurations:

- **React 19 Compatibility**: Uses new JSX transform with `@jsxImportSource react`
- **Strict Type Checking**: All components are fully typed
- **Interface Definitions**: Clear type definitions for Doctor and Appointment data

## Routing Structure

The application uses React Router for navigation:

- `/` - Landing page with doctor search
- `/doctors/:id` - Individual doctor profile page
- `/doctors/:id/book` - Appointment booking form

## Data Management

Currently uses mock data (`mockDoctors.ts`) for development. The data structure includes:

```typescript
interface Doctor {
  id: string;
  name: string;
  specialization: string;
  image: string;
  status: "Available Today" | "Fully Booked" | "On Leave";
  schedule: { day: string; slots: string[] }[];
}
```

## Development Notes

- All React Hooks are called before conditional returns (React 19 requirement)
- Form validation uses controlled components with real-time feedback
- TypeScript strict mode enabled for better code quality
- Bootstrap classes used for responsive design
- Error boundaries and loading states implemented

## Browser Support

- Modern browsers that support ES6+
- Mobile responsive design
- Tested on Chrome, Firefox, Safari, and Edge

## Future Enhancements

- Backend API integration
- User authentication
- Payment processing
- Email notifications
- Calendar integration
- Real-time availability updates



## Features

- **Doctor Search & Filtering**: Browse and search doctors by name or specialization
- **Doctor Profiles**: View detailed doctor information including schedules and availability
- **Appointment Booking**: Book appointments with real-time form validation
- **Responsive Design**: Mobile-friendly interface using React Bootstrap
- **TypeScript Support**: Full type safety and better development experience

## Technology Stack

- **React 19.1.1**: Latest React with new JSX transform
- **TypeScript 4.9.5**: Type-safe JavaScript development
- **React Router DOM 7.7.1**: Client-side routing
- **React Bootstrap 2.10.10**: Professional UI components
- **Bootstrap**: Responsive CSS framework

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository or extract the project files
2. Navigate to the project directory:
   ```bash
   cd healthcare-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.






## Application Structure

```
src/
├── components/          # Reusable UI components
│   └── DoctorCard.tsx  # Doctor listing card component
├── data/               # Mock data and API layer
│   └── mockDoctors.ts  # Sample doctor data
├── pages/              # Main application pages
│   ├── LandingPage.tsx         # Home page with doctor search
│   ├── DoctorProfilePage.tsx   # Individual doctor details
│   └── BookAppointmentPage.tsx # Appointment booking form
├── types/              # TypeScript type definitions
│   └── index.tsx       # Doctor and Appointment interfaces
├── App.tsx            # Main application component with routing
└── index.tsx          # Application entry point
```

## Key Features

### 1. Doctor Search (Landing Page)

- Search doctors by name or specialization
- Filter and display doctor cards
- Navigation to individual doctor profiles

### 2. Doctor Profiles

- Detailed doctor information
- Weekly schedule display
- Available time slots
- Direct booking navigation

### 3. Appointment Booking

- **Comprehensive Form Validation**:
  - Patient name validation (minimum 2 characters, letters only)
  - Email format validation with regex pattern
  - Date validation (no past dates, max 3 months ahead)
  - Required field validation
- **Real-time Feedback**:
  - Field-level validation on blur
  - Visual feedback with green/red borders
  - Detailed error messages
  - Form submission state management
- **User Experience**:
  - Loading states during submission
  - Success/error notifications
  - Navigation controls

## Form Validation Details

The appointment booking form includes advanced validation:

- **Name Field**:
  - Required field
  - Minimum 2 characters
  - Only letters and spaces allowed
- **Email Field**:
  - Required field
  - Valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Date Field**:
  - Required field
  - Cannot select past dates
  - Maximum 3 months in advance
  - Min/max date constraints
- **Time Slot**:
  - Required selection
  - Populated from doctor's available schedule


