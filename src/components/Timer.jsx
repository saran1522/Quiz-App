import { useEffect, useState } from "react";

export default function Timer({ dispatch, numQuestions }) {
  const [secsRemaining, setSecsRemaining] = useState(numQuestions * 10);
  const mins = Math.floor(secsRemaining / 60);
  const seconds = secsRemaining % 60;

  // updating the secsRemaining (timer) every second
  useEffect(() => {
    const id = setInterval(() => {
      setSecsRemaining((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // calling dispatch on "finish" case when the secsRemaining reaches 0
  useEffect(() => {
    if (secsRemaining <= 0) {
      dispatch({ type: "finish" });
    }
  }, [secsRemaining]);

  // console.log("rendering from timer");
  return (
    <div className="timer">
      {mins < 10 ? `0${mins}` : mins}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}
