"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Routine } from "./types";
import { HARDCODED_ROUTINES } from "../exercises/hardcodedRoutines";

const LandingPage = () => {
  const [routines] = useState<Routine[]>(HARDCODED_ROUTINES);
  const router = useRouter();

  const handleStartRoutine = (routine: Routine) => {
    router.push(
      `/timer?routine=${encodeURIComponent(JSON.stringify(routine.exercises))}`
    );
  };

  // const handleEditRoutine = (routineId: number) => {
  //   router.push(`/routines/${routineId}`);
  // };

  // const handleAddRoutine = () => {
  //   router.push("/routines/add");
  // };

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
        Routines
      </h1>

      {/* <button
        onClick={handleAddRoutine}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
      >
        Add New Routine
      </button> */}

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
                onClick={() => handleStartRoutine(routine)}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Start
              </button>
              {/* <button
                onClick={() => handleEditRoutine(routine.id!)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LandingPage;
