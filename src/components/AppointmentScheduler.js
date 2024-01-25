import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase-init"; 

const AppointmentScheduler = () => {
  const [appointment, setAppointment] = useState({
    date: "",
    time: "",
    purpose: "",
  });

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const appointmentsCollection = collection(db, "appointments");
      const appointmentsSnapshot = await getDocs(appointmentsCollection);

      const appointmentsData = appointmentsSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleScheduleAppointment = async (e) => {
    e.preventDefault();

    if (appointment.date && appointment.time && appointment.purpose) {
      try {
        const appointmentsCollection = collection(db, "appointments");
        await addDoc(appointmentsCollection, appointment);

       
        setAppointments([...appointments, appointment]);
        setAppointment({ date: "", time: "", purpose: "" });

        
        fetchAppointments();
      } catch (error) {
        console.error("Error scheduling appointment:", error);
      }
    } else {
      alert("Please fill in all fields before scheduling an appointment.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Appointment Scheduler</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={appointment.date}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            name="time"
            value={appointment.time}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Purpose
        </label>
        <input
          type="text"
          name="purpose"
          value={appointment.purpose}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <button
        onClick={handleScheduleAppointment}
        className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600"
      >
        Schedule Appointment
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
        <ul className="list-disc pl-4">
          {appointments.map((apt) => (
            <li key={apt.id}>
              {apt.date} at {apt.time} - {apt.purpose}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
