"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { RoutineFormValues } from "@/components";
import { deleteRoutine, fetchRoutineById, updateRoutine } from "@/client";
import RoutineForm from "@/components/routine-form";

const EditRoutinePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [routineData, setRoutineData] = useState<RoutineFormValues | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const fetchRoutine = async () => {
    setLoading(true);
    const { data, error } = await fetchRoutineById(id);

    if (error) {
      console.error("Error fetching routine:", error.message);
      alert("Failed to fetch routine.");
      router.push("/"); // Redirect to landing page on failure
    } else {
      if (data && Array.isArray(data)) {
        setRoutineData(data[0] as RoutineFormValues);
      } else {
        console.error("Invalid data format:", data);
        alert("Failed to fetch routine.");
        router.push("/"); // Redirect to landing page on failure
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    if (id) {
      fetchRoutine();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpdateRoutine = async (data: RoutineFormValues) => {
    const { error } = await updateRoutine(id, data);

    if (error) {
      console.error("Error updating routine:", error.message);
      alert("Failed to update routine. Please try again.");
    } else {
      alert("Routine updated successfully!");
      router.push("/"); // Redirect to landing page
    }
  };

  const handleDeleteRoutine = async (id: string) => {
    const { error } = await deleteRoutine(id);

    if (error) {
      console.error("Error deleting routine:", error.message);
      alert("Failed to delete routine. Please try again.");
    } else {
      alert("Routine deleted successfully!");
      router.push("/"); // Redirect to landing page
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#4287f5",
          textAlign: "center",
          padding: "50px",
          fontFamily: "'Roboto', sans-serif",
          color: "#fff",
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

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
        Edit Routine
      </h1>
      {routineData ? (
        <RoutineForm initialData={routineData} onSubmit={handleUpdateRoutine} />
      ) : (
        <p style={{ color: "#fff" }}>Failed to load routine data.</p>
      )}
      <button
        onClick={() => {
          handleDeleteRoutine(`${id}`);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default EditRoutinePage;
