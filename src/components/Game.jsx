import { useEffect, useRef, useState } from "react";
import Question from "./Question";
import Icon from "./Icons";
import { questions } from "../data/questions";

const difficultyLabels = {
  facil: "Fácil",
  medio: "Médio",
  dificil: "Difícil",
};

function Game({ difficulty, onFinish, onExit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const initialTime =
    difficulty === "facil" ? 60 : difficulty === "medio" ? 45 : 30;

  const [time, setTime] = useState(initialTime);

  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const finishedRef = useRef(false);

  const difficultyQuestions = questions.filter(
    (question) => question.difficulty === difficulty
  );

  function playSound(file, volume = 0.7) {
    const audio = new Audio(`/sounds/${file}`);
    audio.volume = volume;
    audio.play().catch(() => {});
  }

  // TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(timer);

          if (!finishedRef.current) {
            finishedRef.current = true;
            playSound("gameover.mp3");
            onFinish(scoreRef.current);
          }

          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onFinish]);

  // RESPONDER PERGUNTA
  function handleAnswer(answer) {
    if (answered || finishedRef.current) return;

    setSelectedAnswer(answer);
    setAnswered(true);

    const currentQuestionData = difficultyQuestions[currentQuestion];
    const correct = answer === currentQuestionData.answer;

    let newScore = scoreRef.current;
    let newLives = livesRef.current;

    if (correct) {
      newScore += 100;
      playSound("acerto.mp3");
    } else {
      newLives -= 1;
      livesRef.current = newLives;
      setLives(newLives);
      playSound("jailsongemendo.mp3");
    }

    scoreRef.current = newScore;
    setScore(newScore);

    setTimeout(() => {
      if (finishedRef.current) return;

      // Perdeu as 3 vidas
      if (newLives <= 0) {
        finishedRef.current = true;
        playSound("gameover.mp3");
        onFinish(newScore);
        return;
      }

      // Terminou todas as perguntas
      if (currentQuestion >= difficultyQuestions.length - 1) {
        finishedRef.current = true;
        onFinish(newScore);
        return;
      }

      // Próxima pergunta
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }, 600);
  }

  if (difficultyQuestions.length === 0) {
    return (
      <section className="game-screen">
        <h2>Não existem perguntas para essa dificuldade.</h2>
      </section>
    );
  }

  const question = difficultyQuestions[currentQuestion];

  return (
    <section className="game-screen">
      <header className="game-header">
        <div className="stat">
          <span>PONTOS</span>
          <strong>{score}</strong>
        </div>

        <div className="stat">
          <span>VIDAS</span>
          <strong className="lives" role="img" aria-label={`${lives} de 3 vidas`}>
            {[0, 1, 2].map((index) => (
              <Icon
                key={index}
                name="heart"
                size={18}
                className={index < lives ? "life" : "life lost"}
              />
            ))}
          </strong>
        </div>

        <div className={`timer ${time <= 10 ? "danger" : ""}`}>
          <Icon name="clock" size={16} />
          {time}s
        </div>

        <div className="stat">
          <span>DIFICULDADE</span>
          <strong>
            <span className={`dot dot-${difficulty}`} />
            {difficultyLabels[difficulty]}
          </strong>
        </div>
      </header>

      <div className="race-area">
        <button type="button" className="exit-button" onClick={onExit}>
          <Icon name="home" size={16} />
          Sair do jogo
        </button>

        <div className="digital-code code-1" aria-hidden="true">101010</div>
        <div className="digital-code code-2" aria-hidden="true">&lt;/&gt;</div>
        <div className="digital-code code-3" aria-hidden="true">AI</div>

        <Icon name="monitor" size={28} className="tech-icon tech-1" />
        <Icon name="terminal" size={28} className="tech-icon tech-2" />

        <Icon name="cpu" size={54} className="robot" />
        <Icon name="bug" size={42} className="bug" />

        <div className="digital-ground">
          <div className="ground-line"></div>
        </div>
      </div>

      <Question
        question={question}
        selectedAnswer={selectedAnswer}
        answered={answered}
        onAnswer={handleAnswer}
      />
    </section>
  );
}

export default Game;
