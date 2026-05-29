import { useState, useEffect } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Inicio",    href: "#" },
  { label: "Catálogo",  href: "#productos" },
  { label: "Tendencias",href: "#tendencias" },
  { label: "Soporte",   href: "#soporte" },
];

function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeLink,  setActiveLink]  = useState("Inicio");
  const [cartCount]                   = useState(3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menu al redimensionar a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="navbar__inner">

          {/* Logo */}
          <a href="#" className="navbar__logo">
            <div className="navbar__logo-icon">⚡</div>
            <span className="navbar__logo-text">
              Vende<span>Fácil</span>
            </span>
          </a>

          {/* Links — desktop */}
          <ul className="navbar__links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`navbar__link${activeLink === label ? " active" : ""}`}
                  onClick={() => setActiveLink(label)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Acciones */}
          <div className="navbar__actions">

            {/* Búsqueda */}
            <button className="navbar__icon-btn" aria-label="Buscar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>

            {/* Carrito */}
            <button className="navbar__icon-btn" aria-label="Carrito">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="3" x2="21" y1="6" y2="6" strokeLinecap="round" />
                <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
              </svg>
              {cartCount > 0 && (
                <span className="navbar__cart-badge">{cartCount}</span>
              )}
            </button>

            {/* Hamburger — móvil */}
            <button
              className={`navbar__hamburger${menuOpen ? " open" : ""}`}
              aria-label="Menú"
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <span />
              <span />
              <span />
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`navbar__mobile${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(({ label, href }, i) => (
          <a
            key={label}
            href={href}
            className="navbar__mobile-link"
            onClick={() => {
              setActiveLink(label);
              setMenuOpen(false);
            }}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {label}
          </a>
        ))}
        <div className="navbar__mobile-divider" />
        <a href="#carrito" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
          🛒 Carrito ({cartCount})
        </a>
      </div>
    </>
  );
}

export default Navbar;