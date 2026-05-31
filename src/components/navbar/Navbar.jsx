import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../../context/useCart";

const NAV_LINKS = [
  { label: "Inicio",     to: "/"          },
  { label: "Catálogo",   to: "/catalogo" },
  { label: "Tendencias", to: "/tendencias" },
  { label: "Soporte",    to: "/soporte"  },
];

function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { cartCount }             = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-text">
              Vende<span>Fácil</span>
            </span>
          </Link>

          {/* Links desktop — NavLink maneja el estado activo automáticamente */}
          <ul className="navbar__links">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  className={({ isActive }) => `navbar__link${isActive ? " active" : ""}`}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Acciones */}
          <div className="navbar__actions">
            <button className="navbar__icon-btn" aria-label="Buscar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>

            <Link to="/carrito" className="navbar__icon-btn" aria-label={`Carrito, ${cartCount} productos`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="3" x2="21" y1="6" y2="6" strokeLinecap="round" />
                <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
              </svg>
              {cartCount > 0 && (
                <span className="navbar__cart-badge" aria-hidden="true">{cartCount}</span>
              )}
            </Link>

            <button
              className={`navbar__hamburger${menuOpen ? " open" : ""}`}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
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
      <div className={`navbar__mobile${menuOpen ? " open" : ""}`} role="navigation" aria-label="Menú móvil">
        {NAV_LINKS.map(({ label, to }, i) => (
          <Link
            key={label}
            to={to}
            className="navbar__mobile-link"
            onClick={closeMenu}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {label}
          </Link>
        ))}
        <div className="navbar__mobile-divider" />
        <Link to="/carrito" className="navbar__mobile-link" onClick={closeMenu}>
          🛒 Carrito ({cartCount})
        </Link>
      </div>
    </>
  );
}

export default Navbar;
