"use client";

import { useState } from "react";
import { Exercise, Routine } from "../types";

const HARDCODED_EXERCISES = [
  { name: "Plank", duration: 30 },
  { name: "Right leg lift", duration: 15 },
  { name: "Left leg lift", duration: 15 },
  { name: "Push up hold", duration: 15 },
  { name: "Shoulder taps", reps: 15, duration: 25 },
  { name: "Rest", duration: 10 },
  { name: "Birddog (right arm, left leg)", duration: 15 },
  { name: "Birddog (left arm, right leg)", duration: 15 },
  { name: "Plank", duration: 30 },
  { name: "Push up hold", duration: 15 },
  { name: "Shoulder taps", reps: 15, duration: 25 },
  { name: "Rest", duration: 10 },
  { name: "Left side plank", duration: 25 },
  { name: "Right side plank", duration: 25 },
  { name: "Left side plank side kick", reps: 15, duration: 25 },
  { name: "Right side plank side kick", reps: 15, duration: 25 },
  { name: "Rest", duration: 15 },
  { name: "Left side plank", duration: 25 },
  { name: "Right side plank", duration: 25 },
  { name: "Left side plank rotation", reps: 15, duration: 25 },
  { name: "Right side plank rotation", reps: 15, duration: 25 },
  { name: "Rest", duration: 60 },
  {
    name: "Knee push up to renegade row (15 each side)",
    reps: 30,
    duration: 120,
  },
  { name: "Weight crunch", reps: 20, duration: 40 },
  { name: "Russian twist", duration: 20 },
  { name: "Mountain climbers", duration: 30 },
  { name: "Bent knee hip raise", reps: 20, duration: 40 },
  { name: "Rest", duration: 60 },
  { name: "Plank", duration: 30 },
  { name: "Right leg lift", duration: 15 },
  { name: "Left leg lift", duration: 15 },
  { name: "Push up hold", duration: 15 },
  { name: "Shoulder taps", duration: 25, reps: 15 },
  { name: "Rest", duration: 10 },
  { name: "Birddog (right arm, left leg)", duration: 15 },
  { name: "Birddog (left arm, right leg)", duration: 15 },
  { name: "Plank", duration: 30 },
  { name: "Push up hold", duration: 15 },
  { name: "Shoulder taps", duration: 25, reps: 15 },
  { name: "Rest", duration: 10 },
  { name: "Left side plank", duration: 25 },
  { name: "Right side plank", duration: 25 },
  { name: "Left side plank side kick", duration: 25, reps: 15 },
  { name: "Right side plank side kick", duration: 25, reps: 15 },
  { name: "Rest", duration: 15 },
  { name: "Left side plank", duration: 25 },
  { name: "Right side plank", duration: 25 },
  { name: "Left side plank rotation", duration: 25, reps: 15 },
  { name: "Right side plank rotation", duration: 25, reps: 15 },
  { name: "Rest", duration: 60 },
  {
    name: "Knee push up to renegade row (15 each side)",
    duration: 120,
    reps: 30,
  },
  { name: "Weight crunch", duration: 40, reps: 20 },
  { name: "Russian twist", duration: 20 },
  { name: "Mountain climbers", duration: 30 },
  { name: "Bent knee hip raise", duration: 40, reps: 20 },
];

const HARDCODED_ROUTINES = [
  {
    id: 1,
    name: "Bank Trainer v3",
    exercises: HARDCODED_EXERCISES,
  },
];

const ManageRoutines = () => {
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [routineName, setRoutineName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const [routines, setRoutines] = useState<Routine[]>(HARDCODED_ROUTINES);

  const handleSaveRoutine = async () => {
    if (!routineName || exercises.length === 0) {
      alert("Please provide a name and at least one exercise.");
      return;
    }

    const routine: Routine = { name: routineName, exercises };

    if (isEditing && selectedRoutine) {
      // Update routine in local state
      setRoutines((prev) =>
        prev.map((r) =>
          r.id === selectedRoutine.id
            ? { ...routine, id: selectedRoutine.id }
            : r
        )
      );
      alert("Routine updated successfully!");
      setIsEditing(false);
      setSelectedRoutine(null);
    } else {
      // Add routine to local state
      setRoutines((prev) => [...prev, { ...routine, id: Date.now() }]);
      alert("Routine created successfully!");
    }

    setRoutineName("");
    setExercises([]);
  };

  const handleEditRoutine = (routine: Routine) => {
    setSelectedRoutine(routine);
    setRoutineName(routine.name);
    setExercises(routine.exercises);
    setIsEditing(true);
  };

  const handleDeleteRoutine = async (id: number) => {
    if (confirm("Are you sure you want to delete this routine?")) {
      setRoutines((prev) => prev.filter((r) => r.id !== id));
      alert("Routine deleted successfully!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#4287f5",
        textAlign: "center",
        padding: "50px",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <h1 style={{ fontSize: "3em", marginBottom: "30px", color: "#fff" }}>
        Manage Routines
      </h1>

      <div style={{ marginBottom: "20px", color: "#fff" }}>
        <h2>{isEditing ? "Edit Routine" : "Add New Routine"}</h2>
        <div className="p-4 bg-gray-100 rounded-lg">
          <input
            type="text"
            placeholder="Routine Name"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            className="w-full p-3 mb-4 text-gray-800 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Enter exercises as JSON"
            value={JSON.stringify(exercises, null, 2)}
            onChange={(e) => {
              try {
                setExercises(JSON.parse(e.target.value || "[]"));
              } catch (error) {
                console.error("Invalid JSON:", error);
              }
            }}
            rows={10}
            className="w-full p-3 mb-4 text-gray-800 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          onClick={handleSaveRoutine}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          }}
        >
          {isEditing ? "Update Routine" : "Save Routine"}
        </button>
        {isEditing && (
          <button
            onClick={() => {
              setIsEditing(false);
              setRoutineName("");
              setExercises([]);
              setSelectedRoutine(null);
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <h2 style={{ fontSize: "2em", color: "#fff", marginBottom: "20px" }}>
        Existing Routines
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {routines.map((routine) => (
          <li
            key={routine.id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong style={{ fontSize: "1.2em", color: "#333" }}>
              {routine.name}
            </strong>
            <div>
              <button
                onClick={() => handleEditRoutine(routine)}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteRoutine(routine.id!)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageRoutines;
