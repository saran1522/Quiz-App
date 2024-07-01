export default function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="main-screen">
      <h2>Welcome To The React Quiz </h2>
      <p>{numQuestions} Questions To test Your React knowledge </p>
      <button
        className="start-btn"
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        Start Now
      </button>
    </div>
  );
}
