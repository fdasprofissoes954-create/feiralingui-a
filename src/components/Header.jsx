import { useEffect, useState } from "react";
import Icon from "./Icons";

const links = [
  { label: "Início", href: "#inicio" },
  { label: "Profissão TI", href: "#profissao" },
  { label: "Curso Técnico", href: "#curso" },
  { label: "Áreas de Atuação", href: "#areas" },
];

function Header({ onPlay }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#inicio" className="brand" aria-label="FUTURO.TI, ir para o início">
          FUTURO<span>.TI</span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>

        <nav id="main-nav" className={`main-nav ${open ? "open" : ""}`} aria-label="Principal">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button type="button" className="nav-game" onClick={onPlay}>
                <Icon name="gamepad" size={18} />
                Corrida do Futuro
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
