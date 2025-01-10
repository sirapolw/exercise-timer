"use client";

import {
  addRoutine,
  deleteRoutine,
  fetchRoutines,
  updateRoutine,
} from "@/client";
import { useState, useEffect } from "react";
import { Exercise, Routine } from "../types";

const ManageRoutines = () => {
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [routineName, setRoutineName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const [routines, setRoutines] = useState<Routine[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchRoutines();
      if (error) {
        console.error("Error fetching routines:", error.message);
      } else {
        setRoutines(data || []);
      }
    };
    fetchData();
  }, []);

  const handleSaveRoutine = async () => {
    if (!routineName || exercises.length === 0) {
      alert("Please provide a name and at least one exercise.");
      return;
    }

    const routine: Routine = { name: routineName, exercises };

    if (isEditing && selectedRoutine) {
      // Update routine
      const { error } = await updateRoutine(selectedRoutine.id, routine);
      if (error) {
        console.error("Error updating routine:", error.message);
      } else {
        alert("Routine updated successfully!");
        setIsEditing(false);
        setSelectedRoutine(null);
      }
    } else {
      // Create routine
      const { error } = await addRoutine(routine);
      const { data } = await fetchRoutines();
      setRoutines(data || []);
      if (error) {
        console.error("Error saving routine:", error.message);
      } else {
        alert("Routine created successfully!");
      }
    }

    setRoutineName("");
    setExercises([]);
    fetchRoutines();
  };

  const handleEditRoutine = (routine: Routine) => {
    setSelectedRoutine(routine);
    setRoutineName(routine.name);
    setExercises(routine.exercises);
    setIsEditing(true);
  };

  const handleDeleteRoutine = async (id: number) => {
    if (confirm("Are you sure you want to delete this routine?")) {
      const { error } = await deleteRoutine(id);

      if (error) {
        console.error("Error deleting routine:", error.message);
      } else {
        alert("Routine deleted successfully!");
        fetchRoutines();
      }
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
