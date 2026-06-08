import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section
      style={{
        minHeight: "calc(100svh - var(--navbar-h))",
        display: "grid",
        placeItems: "center",
        padding: "var(--space-3xl) var(--space-lg)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 520 }}>
        <span
          style={{
            display: "inline-block",
            marginBottom: "var(--space-md)",
            color: "var(--accent-bright)",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
          }}
        >
          404
        </span>
        <h1 style={{ marginBottom: "var(--space-md)" }}>Página no encontrada</h1>
        <p style={{ marginBottom: "var(--space-xl)" }}>
          La ruta que buscas no existe o ya no está disponible.
        </p>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
