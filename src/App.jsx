import { useState } from "react";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import ResultScreen from "./components/ResultScreen";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("start");
  const [difficulty, setDifficulty] = useState(null);
  const [score, setScore] = useState(0);

  function handleStart(selectedDifficulty) {
    setDifficulty(selectedDifficulty);
    setScreen("game");
  }

  function handleFinish(finalScore) {
    setScore(finalScore);
    setScreen("result");
  }

  function handleRestart() {
    setDifficulty(null);
    setScore(0);
    setScreen("start");
  }

  return (
    <>
      {screen === "start" && (
        <StartScreen onStart={handleStart} />
      )}

      {screen === "game" && (
        <Game
          difficulty={difficulty}
          onFinish={handleFinish}
        />
      )}

      {screen === "result" && (
        <ResultScreen
          score={score}
          difficulty={difficulty}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;