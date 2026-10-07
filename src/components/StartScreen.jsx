function StartScreen({ onStart }) {
  return (
    <section className="start-screen">
      <div className="start-card">

        <div className="start-robot">
          🤖
        </div>

        <h1>Corrida do Futuro</h1>

        <p>
          Teste seus conhecimentos sobre profissões
          e descubra até onde você consegue chegar!
        </p>

        <div className="difficulty-container">

          <button
            className="difficulty easy"
            onClick={() => onStart("facil")}
          >
            <span>🟢</span>
            <strong>Fácil</strong>
            <small>60 segundos</small>
          </button>

          <button
            className="difficulty medium"
            onClick={() => onStart("medio")}
          >
            <span>🟡</span>
            <strong>Médio</strong>
            <small>45 segundos</small>
          </button>

          <button
            className="difficulty hard"
            onClick={() => onStart("dificil")}
          >
            <span>🔴</span>
            <strong>Difícil</strong>
            <small>30 segundos • 🍭</small>
          </button>

        </div>

      </div>
    </section>
  );
}

export default StartScreen;