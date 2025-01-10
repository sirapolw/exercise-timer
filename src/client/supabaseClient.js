import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchRoutines = async () => {
  const { data, error } = await supabase.from("routines").select("*");

  if (error) {
    console.error("Error fetching routines:", error.message);
  }
  console.log("Fetched routines:", data);
  return { data, error };
};

export const fetchRoutineById = async (id) => {
  const { data, error } = await supabase
    .from("routines")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error("Error fetching routine:", error.message);
  }
  console.log("Fetched routine:", data);
  return { data, error };
};

export const addRoutine = async (routine) => {
  const { data, error } = await supabase.from("routines").insert([routine]);

  if (error) {
    console.error("Error adding routine:", error.message);
  }
  console.log("Added routine:", data);
  return { data, error };
};

export const updateRoutine = async (id, updates) => {
  const { data, error } = await supabase
    .from("routines")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("Error updating routine:", error.message);
  }
  console.log("Updated routine:", data);
  return { data, error };
};

export const deleteRoutine = async (id) => {
  const { data, error } = await supabase.from("routines").delete().eq("id", id);

  if (error) {
    console.error("Error deleting routine:", error.message);
  }
  console.log("Deleted routine:", data);
  return { data, error };
};
