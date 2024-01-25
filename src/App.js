// App.js

import React from "react";
import "tailwindcss/tailwind.css"; 
import Dashboard from "./components/Dashboard";
import MedicationReminders from "./components/MedicationReminders";
import ExercisePlans from "./components/ExercisePlans";
import AppointmentScheduler from "./components/AppointmentScheduler";
import EmergencyButton from "./components/EmergencyButton";

const App = () => {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Elderly Care App</h1>
      </header>

      <main className="p-4">
        {/* Dashboard Component */}
        <Dashboard />

        {/* Medication Reminders Component */}
        <MedicationReminders />

        {/* Exercise Plans Component */}
        <ExercisePlans />

        {/* Appointment Scheduler Component */}
        <AppointmentScheduler />

        {/* Emergency Button Component */}
        <EmergencyButton />
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2023 Elderly Care App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
