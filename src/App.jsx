import { useCallback, useState } from "react";
import Home from "./components/Home";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import ResultScreen from "./components/ResultScreen";
import "./styles/site.css";
import "./App.css";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
}

function App() {
  // "home" = página inicial | "game" = área do jogo
  const [view, setView] = useState("home");

  // Telas dentro do jogo: "start" | "game" | "result"
  const [screen, setScreen] = useState("start");
  const [difficulty, setDifficulty] = useState(null);
  const [score, setScore] = useState(0);

  function resetGame() {
    setDifficulty(null);
    setScore(0);
    setScreen("start");
  }

  function openGame() {
    resetGame();
    setView("game");
    scrollToTop();
  }

  function goHome() {
    resetGame();
    setView("home");
    scrollToTop();
  }

  function handleStart(selectedDifficulty) {
    setDifficulty(selectedDifficulty);
    setScreen("game");
  }

  const handleFinish = useCallback((finalScore) => {
    setScore(finalScore);
    setScreen("result");
  }, []);

  if (view === "home") {
    return <Home onPlay={openGame} />;
  }

  return (
    <>
      {screen === "start" && (
        <StartScreen onStart={handleStart} onBack={goHome} />
      )}

      {screen === "game" && (
        <Game
          difficulty={difficulty}
          onFinish={handleFinish}
          onExit={goHome}
        />
      )}

      {screen === "result" && (
        <ResultScreen
          score={score}
          difficulty={difficulty}
          onRestart={resetGame}
          onHome={goHome}
        />
      )}
    </>
  );
}

export default App;
