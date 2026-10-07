function ResultScreen({
  score,
  difficulty,
  onRestart
}) {

  const wonLollipop =
    difficulty === "dificil" && score >= 800;

  return (
    <section className="result-screen">

      <div className="result-card">

        <div className="result-robot">
          {wonLollipop ? "🤖🎉" : "🤖"}
        </div>

        <h1>
          🏁 Fim de jogo parabenskkkkkkkkkkjjjjjjjj!
        </h1>

        <p className="result-score">
          Sua pontuação
        </p>

        <strong className="big-score">
          {score}
        </strong>

        <span className="points-text">
          PONTOS
        </span>

        {wonLollipop ? (

          <div className="lollipop-win">

            <div className="lollipop">
              🍭
            </div>

            <h2>
              VOCÊ GANHOU UM PIRULITO! MOSTRE ESSA TELA PARA O APRESENTADOR!!
            </h2>

            <p>
              Parabéns! Você conseguiu
              <strong> 800 pontos ou mais!</strong>
            </p>

          </div>

        ) : (

          <div className="normal-result">

            {difficulty === "dificil" && (
              <p>
                🍭 Você precisava de
                <strong> 800 pontos</strong>
                para ganhar o pirulito!
              </p>
            )}

            <p>
              Boa tentativa! 😎
            </p>

          </div>

        )}

        <button
          className="restart-button"
          onClick={onRestart}
        >
          🔄 Jogar novamente
        </button>

      </div>

    </section>
  );
}

export default ResultScreen;