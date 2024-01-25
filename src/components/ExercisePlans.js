import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore"; 
import { db} from "../firebase-init";

const ExercisePlans = () => {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [exercisePlans, setExercisePlans] = useState([]);

  const exerciseOptions = [
    "Walking",
    "Cycling",
    "Yoga",
    "Strength Training",
    "Swimming",
  ];

  const handleExerciseChange = (e) => {
    setSelectedExercise(e.target.value);
  };

  const handleAddExercisePlan = async () => {
    
    if (selectedExercise) {
      try {
        
        await addDoc(collection(db, "exercisePlans"), {
          exercise: selectedExercise,
        });
        setExercisePlans([...exercisePlans, selectedExercise]);
        setSelectedExercise("");
      } catch (error) {
        console.error("Error adding exercise plan:", error);
      }
    } else {
      alert("Please select an exercise before adding a plan.");
    }
  };

  useEffect(() => {
    const fetchExercisePlans = async () => {
      try {
        const exercisePlansCollection = collection(db, "exercisePlans");
        const exercisePlansSnapshot = await getDocs(exercisePlansCollection);
        const exercisePlansData = exercisePlansSnapshot.docs.map(
          (doc) => doc.data().exercise
        );
        setExercisePlans(exercisePlansData);
      } catch (error) {
        console.error("Error fetching exercise plans:", error);
      }
    };

    fetchExercisePlans();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Exercise Plans</h1>

      {/* Exercise Selection Form */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Exercise
        </label>
        <select
          name="exercise"
          value={selectedExercise}
          onChange={handleExerciseChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="" disabled>
            Select an exercise
          </option>
          {exerciseOptions.map((exercise, index) => (
            <option key={index} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddExercisePlan}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Add Exercise Plan
      </button>

      {/* Exercise Plans List */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Exercise Plans List</h2>
        <ul className="list-disc pl-4">
          {exercisePlans.map((exercise, index) => (
            <li key={index}>{exercise}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExercisePlans;
