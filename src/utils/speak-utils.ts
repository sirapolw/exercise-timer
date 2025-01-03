import { Exercise } from "@/app/types";

export const speakExercise = (exercise: Exercise) => {
  let toBeSpoken = exercise.name + " for " + exercise.duration + " seconds";

  if (exercise.reps) {
    toBeSpoken = exercise.name + " for " + exercise.reps + " reps";
  }

  const utterance = new SpeechSynthesisUtterance(toBeSpoken);
  speechSynthesis.speak(utterance);
};
