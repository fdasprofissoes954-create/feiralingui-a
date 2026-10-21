import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Icon from "./Icons";
import {
  activities,
  areas,
  steps,
  courseTopics,
  skills,
  projects,
  gameFeatures,
  whyPoints,
} from "../data/content";

function Reveal({ children, className = "", as: Tag = "div", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function Section({ id, eyebrow, title, intro, children, tone = "" }) {
  return (
    <section id={id} className={`section ${tone}`.trim()} aria-labelledby={`${id}-title`}>
      <div className="container">
        <Reveal className="section-head">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 id={`${id}-title`}>{title}</h2>
          {intro && <p className="section-intro">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

const codeLines = [
  [["c", "// meu primeiro projeto"]],
  [["k", "function "], ["f", "aprender"], ["", "(tema) {"]],
  [["", "  "], ["k", "return "], ["f", "criar"], ["", "(tema, "], ["s", '"projeto"'], ["", ");"]],
  [["", "}"]],
  [["", " "]],
  [["f", "aprender"], ["", "("], ["s", '"lógica"'], ["", ");"]],
  [["p", "$ "], ["", "npm run dev"]],
  [["ok", "projeto rodando"]],
];

function StudentIllustration() {
  return (
    <svg
      className="student-art"
      viewBox="0 0 320 220"
      role="img"
      aria-label="Ilustração de um estudante programando em um notebook"
    >
      <rect x="16" y="172" width="288" height="8" rx="4" fill="#122440" />
      <rect x="150" y="76" width="140" height="96" rx="8" fill="#0d1b2e" stroke="#3b82f6" strokeWidth="2" />
      <rect x="164" y="94" width="52" height="6" rx="3" fill="#22d3ee" />
      <rect x="164" y="108" width="92" height="6" rx="3" fill="#3b82f6" />
      <rect x="178" y="122" width="66" height="6" rx="3" fill="#7b8ea9" />
      <rect x="164" y="136" width="42" height="6" rx="3" fill="#22d3ee" />
      <rect x="164" y="150" width="76" height="6" rx="3" fill="#3b82f6" />
      <circle cx="84" cy="96" r="22" fill="#a3b5cf" />
      <path d="M44 172c0-32 17-52 40-52s40 20 40 52z" fill="#2563eb" />
      <path d="M112 150l34 14" stroke="#a3b5cf" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

function Hero({ onPlay }) {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Tecnologia da Informação</p>
          <h1 id="hero-title">
            A tecnologia transforma o mundo. <span>Você pode fazer parte disso.</span>
          </h1>
          <p className="lead">
            A Tecnologia da Informação está presente nos aplicativos que usamos,
            nos sistemas das empresas, na segurança dos nossos dados e nas
            soluções que conectam pessoas. Descubra como funciona essa área e
            como começar sua jornada na tecnologia.
          </p>
          <div className="btn-row">
            <a className="btn btn-primary" href="#profissao">
              Explorar a profissão
              <Icon name="arrow" size={18} />
            </a>
            <button type="button" className="btn btn-secondary" onClick={onPlay}>
              <Icon name="gamepad" size={18} />
              Jogar Corrida do Futuro
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="terminal">
            <div className="terminal-bar">
              <span /><span /><span />
              <em>futuro.js</em>
            </div>
            <pre>
              <code>
                {codeLines.map((line, i) => (
                  <span className="code-line" key={i}>
                    {line.map(([type, text], j) => (
                      <span key={j} className={`tok-${type}`}>{text}</span>
                    ))}
                  </span>
                ))}
              </code>
            </pre>
          </div>
          <ul className="hero-badges">
            <li><Icon name="code" size={16} /> Programação</li>
            <li><Icon name="database" size={16} /> Dados</li>
            <li><Icon name="network" size={16} /> Redes</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function WhatIsIT() {
  const points = [
    "O uso de computadores e sistemas para processar informações.",
    "O desenvolvimento e a manutenção de softwares.",
    "O armazenamento e a proteção de dados.",
    "O funcionamento de redes e infraestrutura.",
    "A criação de soluções tecnológicas para problemas reais.",
  ];

  const tiles = [
    { icon: "code", label: "Software" },
    { icon: "database", label: "Dados" },
    { icon: "network", label: "Redes" },
    { icon: "shield", label: "Segurança" },
  ];

  return (
    <Section
      id="profissao"
      eyebrow="Profissão TI"
      title="O que é Tecnologia da Informação?"
      intro="TI é a área que usa computadores, programas e redes para criar, guardar, proteger e transmitir informações."
    >
      <div className="split">
        <Reveal>
          <ul className="check-list">
            {points.map((point) => (
              <li key={point}>
                <Icon name="check" size={18} />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <p className="callout">
            TI não significa apenas consertar computadores. A área também envolve
            programação, análise, segurança, organização de dados, comunicação
            entre sistemas e desenvolvimento de soluções.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ul className="ti-map" aria-label="Pilares da Tecnologia da Informação">
            {tiles.map((tile) => (
              <li key={tile.label}>
                <Icon name={tile.icon} size={30} />
                <span>{tile.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

function WhatTheyDo() {
  return (
    <Section
      id="atividades"
      eyebrow="Dia a dia"
      title="O que faz um profissional de TI?"
      intro="Alguns exemplos de atividades reais da área."
      tone="section-alt"
    >
      <ul className="card-grid">
        {activities.map((item, index) => (
          <Reveal as="li" className="card" key={item.title} delay={index * 50}>
            <span className="icon-box"><Icon name={item.icon} /></span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function Areas() {
  return (
    <Section
      id="areas"
      eyebrow="Áreas de Atuação"
      title="Conheça as áreas da tecnologia"
      intro="São caminhos profissionais distintos dentro do setor de TI. Nem todos são ensinados em todo curso técnico: cada formação tem seu foco."
    >
      <ul className="card-grid">
        {areas.map((area, index) => (
          <Reveal as="li" className="card" key={area.title} delay={(index % 4) * 60}>
            <span className="icon-box"><Icon name={area.icon} /></span>
            <h3>{area.title}</h3>
            <p>{area.text}</p>
            <ul className="tags" aria-label="Tecnologias relacionadas">
              {area.tech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function HowToStart() {
  return (
    <Section
      id="comecar"
      eyebrow="Primeiros passos"
      title="Como começar na área de TI?"
      intro="Não é preciso dominar todas as tecnologias desde o início. A prática constante é o que desenvolve as habilidades, um passo de cada vez."
      tone="section-alt"
    >
      <ol className="timeline">
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 40}>
            <span className="step-number" aria-hidden="true">{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function Course() {
  return (
    <Section
      id="curso"
      eyebrow="Curso Técnico"
      title="O curso técnico de informática"
      intro="Dependendo da instituição e da grade curricular, um curso técnico de informática pode abordar temas como os abaixo."
    >
      <div className="split">
        <Reveal>
          <h3 className="block-title">Temas que podem ser estudados</h3>
          <ul className="check-list">
            {courseTopics.map((topic) => (
              <li key={topic}>
                <Icon name="check" size={18} />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <h3 className="block-title">Habilidades desenvolvidas</h3>
          <ul className="chips">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <p className="fine-print">
            A grade, a duração e os conteúdos variam conforme a instituição. Esta
            plataforma é um projeto educativo independente, inspirado no tipo de
            experiência prática oferecida por escolas técnicas como o CEAP. Ela
            não é um site oficial de nenhuma instituição.
          </p>
        </Reveal>
      </div>

      <Reveal className="hands-on">
        <div className="hands-on-copy">
          <h3>Aprender tecnologia é colocar a mão na massa.</h3>
          <p>
            Projetos práticos ajudam os estudantes a transformar conhecimentos em
            soluções reais. Criar um site, desenvolver um sistema, montar uma
            aplicação ou construir um jogo são maneiras de praticar programação e
            compreender como a tecnologia funciona.
          </p>
        </div>
        <StudentIllustration />
      </Reveal>
    </Section>
  );
}

function Projects() {
  return (
    <Section
      id="projetos"
      eyebrow="Na prática"
      title="Projetos na prática"
      intro="Em TI, a teoria ganha sentido quando você cria, testa, corrige e melhora uma solução. Alguns exemplos de projetos que estudantes podem desenvolver:"
      tone="section-alt"
    >
      <ul className="card-grid">
        {projects.map((project, index) => (
          <Reveal as="li" className="card" key={project.title} delay={(index % 3) * 60}>
            <span className="icon-box"><Icon name={project.icon} /></span>
            <h3>{project.title}</h3>
            <p>{project.text}</p>
            <p className="learns">
              <strong>O que ensina:</strong> {project.learns}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function GamePromo({ onPlay }) {
  return (
    <section id="jogo" className="section" aria-labelledby="jogo-title">
      <div className="container">
        <Reveal className="promo-panel">
          <div className="promo-copy">
            <p className="eyebrow">Jogo educativo</p>
            <h2 id="jogo-title">Corrida do Futuro</h2>
            <p className="promo-subtitle">
              Teste seus conhecimentos, responda aos desafios e descubra o quanto
              você sabe sobre tecnologia e profissões.
            </p>
            <p>
              O jogo é uma atividade educativa com perguntas de múltipla escolha
              e tempo limitado. Escolha um nível e tente chegar ao fim sem perder
              todas as vidas.
            </p>
            <button type="button" className="btn btn-primary" onClick={onPlay}>
              Jogar agora
              <Icon name="arrow" size={18} />
            </button>
          </div>

          <ul className="promo-features">
            {gameFeatures.map((feature) => (
              <li key={feature.title}>
                <span className="icon-box"><Icon name={feature.icon} /></span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function WhyLearn({ onPlay }) {
  return (
    <Section
      id="porque"
      eyebrow="Para refletir"
      title="Por que aprender TI?"
      tone="section-alt"
    >
      <Reveal>
        <ul className="check-list wide">
          {whyPoints.map((point) => (
            <li key={point}>
              <Icon name="check" size={18} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="closing">
        <p>O futuro da tecnologia também depende das ideias que você começa a desenvolver hoje.</p>
        <div className="btn-row center">
          <a className="btn btn-secondary" href="#areas">Explorar as áreas</a>
          <button type="button" className="btn btn-primary" onClick={onPlay}>
            Iniciar a Corrida do Futuro
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </Reveal>
    </Section>
  );
}

function Home({ onPlay }) {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header onPlay={onPlay} />

      <main id="conteudo">
        <Hero onPlay={onPlay} />
        <WhatIsIT />
        <WhatTheyDo />
        <Areas />
        <HowToStart />
        <Course />
        <Projects />
        <GamePromo onPlay={onPlay} />
        <WhyLearn onPlay={onPlay} />
      </main>

      <Footer onPlay={onPlay} />
    </>
  );
}

export default Home;
