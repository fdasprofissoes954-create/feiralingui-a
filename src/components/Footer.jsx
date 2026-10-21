function Footer({ onPlay }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="brand">FUTURO<span>.TI</span></p>
          <p className="footer-text">
            Plataforma educativa para apresentar a área de Tecnologia da
            Informação a estudantes do ensino médio e de cursos técnicos.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="footer-title">Navegação</h2>
          <ul>
            <li><a href="#inicio">Início</a></li>
            <li><a href="#profissao">Profissão TI</a></li>
            <li><a href="#curso">Curso Técnico</a></li>
            <li><a href="#areas">Áreas de Atuação</a></li>
            <li>
              <button type="button" className="link-button" onClick={onPlay}>
                Corrida do Futuro
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container footer-note">
        Projeto educativo independente. Não é um site oficial de nenhuma instituição de ensino.
      </div>
    </footer>
  );
}

export default Footer;
