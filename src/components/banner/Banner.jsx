import "./Banner.css";
import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.png";

function Banner() {
  return (
    <section className="banner">

      {/* Fondo decorativo */}
      <div className="banner__bg">
        <div className="banner__bg-glow" aria-hidden="true" />
        <div className="banner__bg-glow2" aria-hidden="true" />
        <div className="banner__bg-grid" aria-hidden="true" />
        <div className="banner__bg-noise" aria-hidden="true" />
      </div>

      <div className="banner__inner">

        {/* ── Contenido ── */}
        <div className="banner__content">

          <span className="banner__badge">
            <span className="banner__badge-dot" aria-hidden="true" />
            Edición Limitada
          </span>

          <h1 className="banner__title">
            La nueva era del{" "}
            <span className="banner__title-accent">lujo digital.</span>
          </h1>

          <p className="banner__description">
            Descubre una curaduría exclusiva de tecnología y moda
            diseñada para quienes no se conforman con lo ordinario.
          </p>

          <div className="banner__stats">
            <div className="banner__stat">
              <span className="banner__stat-value">40+</span>
              <span className="banner__stat-label">Productos</span>
            </div>

            <div className="banner__stat">
              <span className="banner__stat-value">6</span>
              <span className="banner__stat-label">Categorías</span>
            </div>

            <div className="banner__stat">
              <span className="banner__stat-value">SPA</span>
              <span className="banner__stat-label">React</span>
            </div>
          </div>

          <div className="banner__buttons">
            <Link to="/tendencias" className="btn btn-primary">
              Comprar ahora
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <Link to="/catalogo" className="btn btn-ghost">
              Ver catálogo
            </Link>
          </div>

        </div>

        {/* ── Visual ── */}
        <div className="banner__visual">

          <div className="banner__image-wrapper">
            <img
              src={heroImg}
              alt="Tecnología premium VendeFácil"
              className="banner__image"
            />
          </div>

          <div className="banner__chip banner__chip--rating">
            <span className="banner__chip-icon">💻</span>
            <div className="banner__chip-text">
              <span className="banner__chip-value">Demo Frontend</span>
              <span className="banner__chip-sub">React + Vite</span>
            </div>
          </div>

          <div className="banner__chip banner__chip--shipping">
            <span className="banner__chip-icon">🚀</span>
            <div className="banner__chip-text">
              <span className="banner__chip-value">Responsive</span>
              <span className="banner__chip-sub">Desktop y móvil</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Banner;