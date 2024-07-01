import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import Status from "./components/Status";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import QuestionPoints from "./components/QuestionPoints";

const API_KEY = import.meta.env.VITE_API_KEY;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  isDark: false,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "answered": {
      const currQuestion = state.questions.at(state.index);
      const allAnswers = Object.keys(currQuestion.correct_answers).map(
        (key) => currQuestion.correct_answers[key]
      );
      const correctAnswer = allAnswers.findIndex((ans) => ans === "true");

      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === correctAnswer ? state.score + 10 : state.score,
      };
    }

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      console.log("insided finish payload after time over");
      return {
        ...state,
        status: "finished",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };
    case "restart":
      return {
        ...state,
        status: "active",
        index: 0,
        answer: null,
        score: 0,
      };

    case "toggle":
      return {
        ...state,
        isDark: !state.isDark,
      };
    default:
      return new Error("unkown action");
  }
}

function App() {
  const [
    { questions, status, index, answer, score, isDark, highScore },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxScore = questions.reduce(
    (total, curr) =>
      total +
      (curr.difficulty === "Easy"
        ? 10
        : curr.difficulty === "Medium"
        ? 15
        : 20),
    0
  );

  useEffect(() => {
    async function fetchQustions() {
      try {
        const response = await fetch(
          `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=Linux`
        );
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
        // console.log(data);
      } catch (err) {
        dispatch({ type: "dataFailed" });
        console.error(err);
      }
    }
    fetchQustions();
  }, []);

  return (
    <div className={`container ${isDark ? "dark" : ""}`}>
      <Header dispatch={dispatch} isDark={isDark} />
      <Quiz>
        {(status === "loading" || status === "error") && (
          <Status status={status} />
        )}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              maxScore={maxScore}
              index={index}
              answer={answer}
              score={score}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} numQuestions={numQuestions} />
              <QuestionPoints question={questions[index]} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                isDark={isDark}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            score={score}
            maxScore={maxScore}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Quiz>
    </div>
  );
}

export default App;
