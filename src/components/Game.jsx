import { useEffect, useRef, useState } from "react";
import Question from "./Question";
import { questions } from "../data/questions";

function Game({ difficulty, onFinish }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const initialTime =
    difficulty === "facil"
      ? 60
      : difficulty === "medio"
      ? 45
      : 30;

  const [time, setTime] = useState(initialTime);

  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const finishedRef = useRef(false);

  const difficultyQuestions = questions.filter(
    (question) => question.difficulty === difficulty
  );

  // =====================================
  // FUNÇÃO PARA TOCAR OS ÁUDIOS
  // =====================================

  function playSound(file, volume = 0.7) {
    const audio = new Audio(`/sounds/${file}`);

    audio.volume = volume;

    audio.play().catch(() => {});
  }

  // =====================================
  // TIMER
  // =====================================

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(timer);

          if (!finishedRef.current) {
            finishedRef.current = true;

            // ⏰ GAME OVER POR TEMPO
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

  // =====================================
  // RESPONDER PERGUNTA
  // =====================================

  function handleAnswer(answer) {
    if (answered || finishedRef.current) return;

    setSelectedAnswer(answer);
    setAnswered(true);

    const currentQuestionData =
      difficultyQuestions[currentQuestion];

    const correct =
      answer === currentQuestionData.answer;

    let newScore = scoreRef.current;
    let newLives = livesRef.current;

    // =====================================
    // ACERTO
    // =====================================

    if (correct) {
      newScore += 100;

      // ✅ SOM DE ACERTO
      playSound("acerto.mp3");
    }

    // =====================================
    // ERRO
    // =====================================

    else {
      newLives -= 1;

      livesRef.current = newLives;
      setLives(newLives);

      // ❌ SOM AO PERDER VIDA
      playSound("jailsongemendo.mp3");
    }

    scoreRef.current = newScore;
    setScore(newScore);

    // =====================================
    // PRÓXIMA ETAPA
    // =====================================

    setTimeout(() => {
      if (finishedRef.current) return;

      // =====================================
      // PERDEU AS 3 VIDAS
      // =====================================

      if (newLives <= 0) {
        finishedRef.current = true;

        // 💀 GAME OVER
        playSound("gameover.mp3");

        onFinish(newScore);
        return;
      }

      // =====================================
      // TERMINOU TODAS AS PERGUNTAS
      // =====================================

      if (
        currentQuestion >=
        difficultyQuestions.length - 1
      ) {
        finishedRef.current = true;

        // =====================================
        // GANHOU O PIRULITO
        // =====================================

        if (
          difficulty === "dificil" &&
          newScore >= 800
        ) {
          // 🍭 SOM ESPECIAL DO PIRULITO
          playSound("gta.mp3");
        }

        onFinish(newScore);
        return;
      }

      // =====================================
      // PRÓXIMA PERGUNTA
      // =====================================

      setCurrentQuestion(
        (previous) => previous + 1
      );

      setSelectedAnswer(null);
      setAnswered(false);

    }, 600);
  }

  // =====================================
  // CASO NÃO TENHA PERGUNTAS
  // =====================================

  if (difficultyQuestions.length === 0) {
    return (
      <section className="game-screen">
        <h2>
          Não existem perguntas para essa dificuldade.
        </h2>
      </section>
    );
  }

  const question =
    difficultyQuestions[currentQuestion];

  // =====================================
  // TELA DO JOGO
  // =====================================

  return (
    <section className="game-screen">

      {/* =================================
          HEADER
      ================================= */}

      <header className="game-header">

        <div className="stat">
          <span>PONTOS</span>

          <strong>
            {score}
          </strong>
        </div>


        <div className="stat">

          <span>VIDAS</span>

          <strong className="lives">
            {"❤️".repeat(lives)}
            {"🖤".repeat(3 - lives)}
          </strong>

        </div>


        <div
          className={`timer ${
            time <= 10 ? "danger" : ""
          }`}
        >
          ⏱️ {time}s
        </div>


        <div className="stat">

          <span>DIFICULDADE</span>

          <strong>

            {difficulty === "facil" &&
              "🟢 Fácil"}

            {difficulty === "medio" &&
              "🟡 Médio"}

            {difficulty === "dificil" &&
              "🔴 Difícil"}

          </strong>

        </div>

      </header>


      {/* =================================
          ÁREA DA CORRIDA
      ================================= */}

      <div className="race-area">

        <div className="digital-code code-1">
          101010
        </div>

        <div className="digital-code code-2">
          &lt;/&gt;
        </div>

        <div className="digital-code code-3">
          AI
        </div>


        <div className="tech-icon tech-1">
          💻
        </div>

        <div className="tech-icon tech-2">
          ⚡
        </div>


        <div className="robot">
          🤖
        </div>

        <div className="bug">
          🦠
        </div>


        <div className="digital-ground">

          <div className="ground-line"></div>

        </div>

      </div>


      {/* =================================
          PERGUNTA
      ================================= */}

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