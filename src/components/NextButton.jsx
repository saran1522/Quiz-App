export default function NextButton({
  dispatch,
  answer,
  isDark,
  index,
  numQuestions,
}) {
  // if (answer === null) return;
  if (index < numQuestions - 1)
    return (
      <div>
        <button
          className={`next-btn ${isDark ? "dark-btn" : ""}`}
          onClick={() => {
            dispatch({ type: "nextQuestion" });
          }}
          disabled={answer === null}
        >
          Next
        </button>
      </div>
    );
  if (index === numQuestions - 1)
    return (
      <div>
        <button
          className={`next-btn ${isDark ? "dark-btn" : ""}`}
          onClick={() => {
            dispatch({ type: "finish" });
          }}
        >
          Finish
        </button>
      </div>
    );
}
