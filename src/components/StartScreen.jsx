import Icon from "./Icons";

function StartScreen({ onStart, onBack }) {
  return (
    <section className="start-screen">
      <div className="start-card">
        <div className="start-robot">
          <Icon name="cpu" size={34} />
        </div>

        <h1>Corrida do Futuro</h1>

        <p>
          Teste seus conhecimentos sobre profissões e tecnologia e descubra até
          onde você consegue chegar. Escolha um nível para começar.
        </p>

        <div className="difficulty-container">
          <button type="button" className="difficulty easy" onClick={() => onStart("facil")}>
            <span className="dot dot-facil" />
            <strong>Fácil</strong>
            <small>60 segundos</small>
          </button>

          <button type="button" className="difficulty medium" onClick={() => onStart("medio")}>
            <span className="dot dot-medio" />
            <strong>Médio</strong>
            <small>45 segundos</small>
          </button>

          <button type="button" className="difficulty hard" onClick={() => onStart("dificil")}>
            <span className="dot dot-dificil" />
            <strong>Difícil</strong>
            <small>30 segundos</small>
          </button>
        </div>

        <button type="button" className="back-link" onClick={onBack}>
          Voltar para a página inicial
        </button>
      </div>
    </section>
  );
}

export default StartScreen;
