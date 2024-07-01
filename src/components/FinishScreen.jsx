export default function FinishScreen({ score, maxScore, highScore, dispatch }) {
  const percentage = Math.ceil((score / maxScore) * 100);
  return (
    <main>
      <p className="score">
        You Have Scord {score}/{maxScore} ({percentage})%
      </p>
      <p>Highscore: {highScore}</p>
      <button
        className="again-btn"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Start Again
      </button>
    </main>
  );
}
