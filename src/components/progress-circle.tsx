import React from "react";

interface ProgressCircleProps {
  timeLeft: number;
  totalTime: number;
}

const ProgressCircle = ({ timeLeft, totalTime }: ProgressCircleProps) => {
  const circleRadius = 150;
  const circumference = 2 * Math.PI * circleRadius;
  const progress = (timeLeft / totalTime) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width="350" height="350">
      <circle
        cx="175"
        cy="175"
        r={circleRadius}
        fill="none"
        stroke="#e0e0e0"
        strokeWidth="12"
      />
      <circle
        cx="175"
        cy="175"
        r={circleRadius}
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
  );
};

export default ProgressCircle;
