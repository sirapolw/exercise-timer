import { Exercise } from "@/app/types";

export const defaultSet: Exercise[] = [
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
  }, // (15 left, 15 right)
  { name: "Weight crunch", duration: 40, reps: 20 },
  { name: "Russian twist", duration: 20 },
  { name: "Mountain climbers", duration: 30 },
  { name: "Bent knee hip raise", duration: 40, reps: 20 },
];
