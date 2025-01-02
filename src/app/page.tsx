"use client";
import { useState, useEffect } from "react";

const exercises = [
  { name: "Starting soon", duration: 5 },
  { name: "Plank", duration: 20 },
  { name: "Right Leg Raise", duration: 10 },
  { name: "Left Leg Raise", duration: 10 },
  { name: "Push-Up Hold", duration: 10 },
  { name: "Shoulder Taps", duration: 10 },
  { name: "Rest", duration: 20 },
  { name: "Birddog (Right Arm, Left Leg)", duration: 20 },
  { name: "Birddog (Left Arm, Right Leg)", duration: 20 },
  { name: "Plank", duration: 20 },
  { name: "Push-Up Hold", duration: 10 },
  { name: "Shoulder Taps", duration: 10 },
  { name: "Rest", duration: 20 },
  { name: "Left Side Plank", duration: 15 },
  { name: "Right Side Plank", duration: 15 },
  { name: "Left Side Plank Side Kick", duration: 10 },
  { name: "Right Side Plank Side Kick", duration: 10 },
  { name: "Rest", duration: 20 },
  { name: "Left Side Plank", duration: 15 },
  { name: "Right Side Plank", duration: 15 },
  { name: "Left Side Plank Rotation", duration: 10 },
  { name: "Right Side Plank Rotation", duration: 10 },
  { name: "Rest", duration: 60 },
];

const Timer = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0].duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1);
        if (timeLeft <= 4 && timeLeft > 1) beepCountdown();
        if (timeLeft == 1) beepEnd();
      } else {
        clearInterval(interval);
        if (currentExerciseIndex < exercises.length - 1) {
          setCurrentExerciseIndex((prev) => prev + 1);
          setTimeLeft(exercises[currentExerciseIndex + 1].duration);
          speak(exercises[currentExerciseIndex + 1].name);
        } else {
          setIsRunning(false);
          alert("Workout Complete!");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isRunning, currentExerciseIndex]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentExerciseIndex(0);
    setTimeLeft(exercises[0].duration);
  };

  const beepCountdown = () => {
    const audio = new Audio("sounds/beep-2.mp3");
    audio.play();
  };
  const beepEnd = () => {
    const audio = new Audio("sounds/beep-1.mp3");
    audio.play();
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const upcomingExercise =
    currentExerciseIndex < exercises.length - 1
      ? exercises[currentExerciseIndex + 1].name
      : "None";

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5em", marginBottom: "20px" }}>
        Exercise Timer
      </h1>
      <h2 style={{ fontSize: "10em", margin: "20px 0" }}>
        {exercises[currentExerciseIndex].name}
      </h2>
      <div style={{ fontSize: "4em", margin: "10px 0" }}>{timeLeft}s</div>
      <h3 style={{ fontSize: "1.5em", color: "gray", margin: "10px 0" }}>
        Next: {upcomingExercise}
      </h3>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={startTimer}
          style={{
            padding: "10px 20px",
            fontSize: "1em",
            marginRight: "10px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Start Timer
        </button>
        <button
          onClick={stopTimer}
          style={{
            padding: "10px 20px",
            fontSize: "1em",
            marginRight: "10px",
            cursor: "pointer",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          style={{
            padding: "10px 20px",
            fontSize: "1em",
            cursor: "pointer",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Reset Timer
        </button>
      </div>
    </div>
  );
};

export default Timer;
