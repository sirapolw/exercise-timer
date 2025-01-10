import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const exerciseSchema = z.object({
  name: z.string().nonempty("Exercise name is required"),
  duration: z
    .number({ invalid_type_error: "Duration must be a number" })
    .positive("Duration must be greater than 0"),
  reps: z
    .number({ invalid_type_error: "Reps must be a number" })
    .positive("Reps must be greater than 0")
    .optional()
    .nullable()
    .default(null),
});

const routineSchema = z.object({
  name: z.string().nonempty("Routine name is required"),
  exercises: z
    .array(exerciseSchema)
    .min(1, "You must add at least one exercise"),
});

export type RoutineFormValues = z.infer<typeof routineSchema>;

const RoutineForm = ({
  initialData,
  onSubmit,
}: {
  initialData?: RoutineFormValues;
  onSubmit: (data: RoutineFormValues) => void;
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RoutineFormValues>({
    resolver: zodResolver(routineSchema),
    defaultValues: initialData || {
      name: "",
      exercises: [{ name: "", duration: 0, reps: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Routine Name */}
      <div style={{ marginBottom: "20px" }}>
        <label
          className="text-stone-800"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Routine Name
        </label>
        <input
          {...register("name")}
          className="w-full p-3 mb-4 text-gray-800 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter routine name"
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      {/* Exercise List */}
      <div>
        <h3 className="text-stone-800">Exercises</h3>
        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            {/* Exercise Name */}
            <div>
              <input
                {...register(`exercises.${index}.name` as const)}
                placeholder="Exercise name"
                className="w-full p-3 mb-4 text-gray-800 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.exercises?.[index]?.name && (
                <p style={{ color: "red" }}>
                  {errors.exercises[index]?.name?.message}
                </p>
              )}
            </div>

            {/* Duration */}
            <div>
              <input
                type="number"
                {...register(`exercises.${index}.duration` as const, {
                  valueAsNumber: true,
                })}
                placeholder="Duration"
                className="w-full p-3 mb-4 text-gray-800 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.exercises?.[index]?.duration && (
                <p style={{ color: "red" }}>
                  {errors.exercises[index]?.duration?.message}
                </p>
              )}
            </div>

            {/* Reps */}
            <div>
              <input
                type="number"
                {...register(`exercises.${index}.reps` as const, {
                  valueAsNumber: true,
                })}
                placeholder="Reps (optional)"
                className="w-full p-3 mb-4 text-gray-800 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.exercises?.[index]?.reps && (
                <p style={{ color: "red" }}>
                  {errors.exercises[index]?.reps?.message}
                </p>
              )}
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => remove(index)}
              style={{
                padding: "8px 12px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Add Exercise Button */}
      <button
        type="button"
        onClick={() => append({ name: "", duration: 0, reps: null })}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        Add Exercise
      </button>

      {/* Submit Button */}
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "8px",
          marginTop: "20px",
          cursor: "pointer",
          display: "block",
          width: "100%",
        }}
      >
        {initialData ? "Save Changes" : "Create Routine"}
      </button>
    </form>
  );
};

export default RoutineForm;
