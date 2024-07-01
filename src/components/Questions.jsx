import React from "react";

export default function Questions({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  const result = Object.keys(question.answers).map(
    (key) => question.answers[key]
  );

  const options = result.filter((res) => res !== null);
  // console.log(options);

  const allAnswers = Object.keys(question.correct_answers).map(
    (key) => question.correct_answers[key]
  );

  const correctAnswer = allAnswers.findIndex((ans) => ans === "true");

  // console.log(correctAnswer);
  // console.log("rendering from questions !!");
  return (
    <div className="main-screen">
      <h3>{question.question}</h3>
      <div className="answers">
        {options.map((option, ind) => (
          <button
            key={option}
            className={`ans-btn ${answer === ind ? "selected" : ""} ${
              hasAnswered ? (ind === correctAnswer ? "correct" : "wrong") : ""
            }`}
            disabled={hasAnswered}
            onClick={() => {
              dispatch({ type: "answered", payload: ind });
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
