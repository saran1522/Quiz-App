import React from "react";

export default function Progress({
  numQuestions,
  maxScore,
  index,
  answer,
  score,
}) {
  return (
    <div className="progress">
      <progress value={index} max={numQuestions} />
      <div className="stats">
        <p>
          {index + 1}/{numQuestions}
        </p>
        <p>
          {score}/{maxScore}
        </p>
      </div>
    </div>
  );
}
