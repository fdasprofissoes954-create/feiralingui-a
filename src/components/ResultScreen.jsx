import Icon from "./Icons";
import { questions } from "../data/questions";

const difficultyLabels = {
  facil: "Fácil",
  medio: "Médio",
  dificil: "Difícil",
};

function getFeedback(percent) {
  if (percent >= 80) {
    return { level: "high", title: "Excelente desempenho!", text: "Você domina esse desafio!" };
  }

  if (percent >= 50) {
    return {
      level: "medium",
      title: "Bom resultado!",
      text: "Você está no caminho certo. Mais uma rodada pode melhorar sua pontuação.",
    };
  }

  return {
    level: "low",
    title: "Continue praticando.",
    text: "Cada desafio é uma oportunidade de aprender!",
  };
}

function ResultScreen({ score, difficulty, onRestart, onHome }) {
  const totalQuestions = questions.filter(
    (question) => question.difficulty === difficulty
  ).length;

  const maxScore = totalQuestions * 100;
  const correctAnswers = score / 100;
  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const feedback = getFeedback(percent);

  return (
    <section className="result-screen">
      <div className="result-card">
        <p className="result-kicker">Fim de jogo</p>

        <h1 className={`result-title ${feedback.level}`}>{feedback.title}</h1>
        <p className="result-message">{feedback.text}</p>

        <p className="result-score">Sua pontuação final</p>
        <strong className="big-score">{score}</strong>
        <span className="points-text">PONTOS</span>

        <dl className="result-meta">
          <div>
            <dt>Dificuldade</dt>
            <dd>{difficultyLabels[difficulty]}</dd>
          </div>
          <div>
            <dt>Acertos</dt>
            <dd>{correctAnswers} de {totalQuestions}</dd>
          </div>
          <div>
            <dt>Aproveitamento</dt>
            <dd>{percent}%</dd>
          </div>
        </dl>

        <div
          className="result-bar"
          role="progressbar"
          aria-label="Aproveitamento"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <div className={`result-bar-fill ${feedback.level}`} style={{ width: `${percent}%` }} />
        </div>

        <div className="result-actions">
          <button type="button" className="restart-button" onClick={onRestart}>
            <Icon name="refresh" size={18} />
            Jogar novamente
          </button>

          <button type="button" className="home-button" onClick={onHome}>
            <Icon name="home" size={18} />
            Voltar à página inicial
          </button>
        </div>
      </div>
    </section>
  );
}

export default ResultScreen;
