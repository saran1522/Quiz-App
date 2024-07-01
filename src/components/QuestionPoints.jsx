import React from "react";

function QuestionPoints({ question }) {
  const points =
    question.difficulty === "Easy"
      ? 10
      : question.difficulty === "Medium"
      ? 15
      : 20;
  console.log(question);
  return <button className="timer">Points: {points}</button>;
}

export default QuestionPoints;
