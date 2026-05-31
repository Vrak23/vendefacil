import { useParams, Link } from "react-router-dom";
import { ALL_PRODUCTS } from "../../data/products";
import { useCart } from "../../context/useCart";
import "./Producto.css";

function Producto() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = ALL_PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="producto__not-found">
        <span className="producto__not-found-icon" aria-hidden="true">🔍</span>
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o fue removido.</p>
        <Link to="/catalogo" className="btn btn-primary">Ir al catálogo</Link>
      </div>
    );
  }

  const { title, price, image, category, categoryName, isNew, discount, rating = 4.5, reviews = 0 } = product;

  const originalPrice = discount ? Math.round(price / (1 - discount / 100)) : null;

  const stars = Array.from({ length: 5 }, (_, i) =>
    i < Math.floor(rating) ? "★" : "☆"
  );

  return (
    <div className="producto">

      {/* Breadcrumb */}
      <div className="producto__breadcrumb-wrap">
        <nav className="producto__breadcrumb">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">›</span>
          <Link to="/catalogo">Catálogo</Link>
          <span aria-hidden="true">›</span>
          <span>{title}</span>
        </nav>
      </div>

      <div className="producto__container">

        {/* Imagen */}
        <div className="producto__image-wrap">
          <div className="producto__image">
            <img src={image} alt={title} />
            <div className="producto__image-bg" aria-hidden="true" />
          </div>

          <div className="producto__image-badges">
            {isNew && (
              <span className="producto__badge producto__badge--new">Nuevo</span>
            )}
            {discount && (
              <span className="producto__badge producto__badge--sale">-{discount}%</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="producto__info">

          {/* Categoría */}
          <span className="producto__category">
            {categoryName || category}
          </span>

          {/* Rating */}
          {reviews > 0 && (
            <div className="producto__rating">
              <div className="producto__stars" aria-label={`${rating} de 5 estrellas`}>
                {stars.map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <span className="producto__rating-count">({reviews} reseñas)</span>
            </div>
          )}

          <h1 className="producto__title">{title}</h1>

          <p className="producto__description">
            Producto tecnológico de alta calidad disponible en VendeFácil.
            Diseñado para quienes exigen rendimiento y estilo en cada detalle.
          </p>

          {/* Precio */}
          <div className="producto__pricing">
            <span className="producto__price">S/ {price.toLocaleString()}</span>
            {originalPrice && (
              <span className="producto__price-original">S/ {originalPrice.toLocaleString()}</span>
            )}
            {discount && (
              <span className="producto__price-saving">
                Ahorras S/ {(originalPrice - price).toLocaleString()}
              </span>
            )}
          </div>

          <div className="producto__divider" aria-hidden="true" />

          {/* Features */}
          <ul className="producto__features">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              Envío gratis en pedidos mayores a S/ 150
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              Garantía de 12 meses
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              Devolución gratuita en 7 días
            </li>
          </ul>

          {/* Acciones */}
          <div className="producto__actions">
            <button
              className="btn btn-primary producto__add-btn"
              onClick={() => addToCart(product)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" x2="21" y1="6" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Agregar al carrito
            </button>

            <Link to="/catalogo" className="btn btn-ghost">
              Ver más
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Producto;