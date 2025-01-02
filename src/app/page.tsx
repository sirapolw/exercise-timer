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
        if (timeLeft === 1) beepEnd();
      } else {
        clearInterval(interval);
        if (currentExerciseIndex < exercises.length - 1) {
          setCurrentExerciseIndex((prev) => prev + 1);
          setTimeLeft(exercises[currentExerciseIndex + 1].duration);
          speak(
            `${exercises[currentExerciseIndex + 1].name} for ${
              exercises[currentExerciseIndex + 1].duration
            } seconds`
          );
        } else {
          setIsRunning(false);
          alert("Workout Complete!");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isRunning, currentExerciseIndex]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
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

  const progress = (timeLeft / exercises[currentExerciseIndex].duration) * 100;

  const circleRadius = 120;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <h1 style={{ fontSize: "3em", marginBottom: "30px", color: "#333" }}>
        Exercise Timer
      </h1>
      <h2
        style={{
          fontSize: "10em",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        {exercises[currentExerciseIndex].name}
      </h2>
      <div
        style={{
          position: "relative",
          width: "350px",
          height: "350px",
          margin: "auto",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "50%",
          backgroundColor: "#f9f9f9",
        }}
      >
        <svg width="350" height="350">
          <circle
            cx="175"
            cy="175"
            r="150"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="12"
          />
          <circle
            cx="175"
            cy="175"
            r="150"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 0.3s linear",
              transform: "rotate(-90deg)",
              transformOrigin: "center",
            }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{ fontSize: "5em", fontWeight: "bold", color: "#4CAF50" }}
          >
            {timeLeft}s
          </div>
        </div>
      </div>
      <h3
        style={{
          fontSize: "1.8em",
          color: "#666",
          margin: "20px 0",
          fontStyle: "italic",
        }}
      >
        Next:{" "}
        {currentExerciseIndex < exercises.length - 1
          ? exercises[currentExerciseIndex + 1].name
          : "None"}
      </h3>
      <div style={{ marginTop: "30px" }}>
        <button
          onClick={startTimer}
          style={{
            padding: "15px 30px",
            fontSize: "1.2em",
            marginRight: "15px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Start Timer
        </button>
        <button
          onClick={stopTimer}
          style={{
            padding: "15px 30px",
            fontSize: "1.2em",
            marginRight: "15px",
            cursor: "pointer",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          style={{
            padding: "15px 30px",
            fontSize: "1.2em",
            cursor: "pointer",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Reset Timer
        </button>
      </div>
    </div>
  );
};

export default Timer;
