"use client";

import { useRouter } from "next/navigation";
import RoutineForm, { RoutineFormValues } from "@/components/routine-form";
import { addRoutine } from "@/client";

const AddRoutinePage = () => {
  const router = useRouter();

  const handleCreateRoutine = async (data: RoutineFormValues) => {
    const { error } = await addRoutine(data);

    if (error) {
      console.error("Error creating routine:", error.message);
      alert("Failed to create routine. Please try again.");
    } else {
      alert("Routine created successfully!");
      router.push("/"); // Redirect to landing page
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
        Add New Routine
      </h1>
      <RoutineForm onSubmit={handleCreateRoutine} />
    </div>
  );
};

export default AddRoutinePage;
