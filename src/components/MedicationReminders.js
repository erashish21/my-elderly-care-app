import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {db } from "../firebase-init";

const MedicationReminders = () => {
  const [medication, setMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
  });

  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchMedicationReminders = async () => {
      try {
        const remindersCollection = collection(db, "medicationReminders");
        const remindersSnapshot = await getDocs(remindersCollection);
        const remindersData = remindersSnapshot.docs.map((doc) => doc.data());
        setReminders(remindersData);
      } catch (error) {
        console.error("Error fetching medication reminders:", error);
      }
    };

    fetchMedicationReminders();
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedication({ ...medication, [name]: value });
  };

  const handleAddReminder = async () => {
    if (medication.name && medication.dosage && medication.frequency) {
      try {
        await addDoc(collection(db, "medicationReminders"), medication);
        setReminders([...reminders, medication]);
        setMedication({ name: "", dosage: "", frequency: "" });
      } catch (error) {
        console.error("Error adding medication reminder:", error);
      }
    } else {
      alert("Please fill in all fields before adding a reminder.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Medication Reminders</h1>

      {/* Medication Input Form */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Medication Name
        </label>
        <input
          type="text"
          name="name"
          value={medication.name}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Dosage
          </label>
          <input
            type="text"
            name="dosage"
            value={medication.dosage}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Frequency
          </label>
          <input
            type="text"
            name="frequency"
            value={medication.frequency}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
      </div>

      <button
        onClick={handleAddReminder}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Add Reminder
      </button>

      {/* Medication Reminders List */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Medication Reminders List</h2>
        <ul className="list-disc pl-4">
          {reminders.map((reminder, index) => (
            <li key={index}>
              {reminder.name} - Dosage: {reminder.dosage}, Frequency:{" "}
              {reminder.frequency}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MedicationReminders;
