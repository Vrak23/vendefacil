import "./ProductCard.css";

function ProductCard({ title, price, image, isNew = false, discount = null, rating = 4.5, reviews = 0 }) {

  const originalPrice = discount ? Math.round(price / (1 - discount / 100)) : null;

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    return filled ? "★" : "☆";
  });

  return (
    <div className="product-card">

      {/* ── Imagen ── */}
      <div className="product-card__image">
        <img src={image} alt={title} loading="lazy" />

        <div className="product-card__image-overlay" aria-hidden="true" />

        {/* Badges */}
        <div className="product-card__badges">
          {isNew      && <span className="product-card__badge product-card__badge--new">Nuevo</span>}
          {discount   && <span className="product-card__badge product-card__badge--sale">-{discount}%</span>}
        </div>

        {/* Wishlist */}
        <button className="product-card__wishlist" aria-label="Guardar en favoritos">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Quick add */}
        <button className="product-card__quick-add" aria-label="Agregar rápido">
          + Agregar rápido
        </button>
      </div>

      {/* ── Info ── */}
      <div className="product-card__info">

        {/* Rating */}
        {reviews > 0 && (
          <div className="product-card__rating">
            <div className="product-card__stars" aria-label={`${rating} de 5 estrellas`}>
              {stars.map((s, i) => <span key={i}>{s}</span>)}
            </div>
            <span className="product-card__rating-count">({reviews})</span>
          </div>
        )}

        <h3 className="product-card__title">{title}</h3>

        <div className="product-card__pricing">
          <span className="product-card__price">S/ {price.toLocaleString()}</span>
          {originalPrice && (
            <span className="product-card__price-original">S/ {originalPrice.toLocaleString()}</span>
          )}
        </div>

        <button className="product-card__add-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="3" x2="21" y1="6" y2="6" strokeLinecap="round" />
            <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
          </svg>
          Agregar al carrito
        </button>

      </div>
    </div>
  );
}

export default ProductCard;