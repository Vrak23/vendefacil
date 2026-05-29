import "./Banner.css";
import heroImg from "../../assets/hero.png";

function Banner() {
  return (
    <section className="banner">

      {/* Fondo decorativo */}
      <div className="banner__bg">
        <div className="banner__bg-glow"  aria-hidden="true" />
        <div className="banner__bg-glow2" aria-hidden="true" />
        <div className="banner__bg-grid"  aria-hidden="true" />
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
              <span className="banner__stat-value">+2K</span>
              <span className="banner__stat-label">Productos</span>
            </div>
            <div className="banner__stat">
              <span className="banner__stat-value">98%</span>
              <span className="banner__stat-label">Satisfacción</span>
            </div>
            <div className="banner__stat">
              <span className="banner__stat-value">24h</span>
              <span className="banner__stat-label">Entrega</span>
            </div>
          </div>

          <div className="banner__buttons">
            <button className="btn btn-primary">
              Comprar ahora
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button className="btn btn-ghost">
              Ver catálogo
            </button>
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

          {/* Chips flotantes */}
          <div className="banner__chip banner__chip--rating">
            <span className="banner__chip-icon">⭐</span>
            <div className="banner__chip-text">
              <span className="banner__chip-value">4.9 / 5.0</span>
              <span className="banner__chip-sub">+1,200 reseñas</span>
            </div>
          </div>

          <div className="banner__chip banner__chip--shipping">
            <span className="banner__chip-icon">🚀</span>
            <div className="banner__chip-text">
              <span className="banner__chip-value">Envío gratis</span>
              <span className="banner__chip-sub">En pedidos +S/.150</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Banner;