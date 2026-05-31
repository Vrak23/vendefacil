import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";
import "./ProductCard.css";

function formatStars(rating) {
  const roundedDown = Math.floor(rating ?? 0);
  return Array.from({ length: 5 }, (_, i) => (i < roundedDown ? "★" : "☆"));
}

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const {
    id,
    title,
    price,
    image,
    category,
    categoryName,
    isNew,
    discount,
    rating = 4.5,
    reviews = 0,
  } = product || {};

  const originalPrice = useMemo(() => {
    if (!discount) return null;
    // discount is a percent
    const original = price / (1 - discount / 100);
    return Number.isFinite(original) ? Math.round(original) : null;
  }, [discount, price]);

  const stars = useMemo(() => formatStars(rating), [rating]);

  const goToDetails = () => {
    if (id == null) return;
    navigate(`/producto/${id}`);
  };

  return (
    <article
      className="product-card"
      role="button"
      tabIndex={0}
      aria-label={`Ver ${title}`}
      onClick={goToDetails}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToDetails();
        }
      }}
    >
      <div className="product-card__image">
        <img src={image} alt={title} loading="lazy" />
        <div className="product-card__image-overlay" aria-hidden="true" />

        <div className="product-card__badges" aria-hidden={!isNew && !discount}>
          {isNew && <span className="product-card__badge product-card__badge--new">Nuevo</span>}
          {discount && (
            <span className="product-card__badge product-card__badge--sale">-{discount}%</span>
          )}
        </div>

        {/* Wishlist placeholder visual (no funcional) */}
        <button
          type="button"
          className="product-card__wishlist"
          aria-label="Agregar a favoritos (próximamente)"
          onClick={e => e.stopPropagation()}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.8 4.6c-1.5-1.6-4-1.7-5.6-.2L12 7.6 8.8 4.4c-1.6-1.5-4.1-1.4-5.6.2-1.5 1.6-1.4 4.1.2 5.6L12 20l8.6-9.8c1.6-1.5 1.7-4 .2-5.6z" />
          </svg>
        </button>

        <button
          type="button"
          className="product-card__quick-add"
          onClick={e => {
            e.stopPropagation();
            if (product) addToCart(product);
          }}
          aria-label={`Agregar ${title} al carrito`}
        >
          Agregar al carrito
        </button>
      </div>

      <div className="product-card__info">
        <span className="product-card__category">{categoryName || category || ""}</span>

        {reviews > 0 && (
          <div className="product-card__rating">
            <div className="product-card__stars" aria-label={`${rating} de 5 estrellas`}>
              {stars.map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
            <span className="product-card__rating-count">({reviews})</span>
          </div>
        )}

        <h3 className="product-card__title">{title}</h3>

        <div className="product-card__divider" aria-hidden="true" />

        <div className="product-card__pricing">
          <span className="product-card__price">S/ {price?.toLocaleString?.() ?? price}</span>
          {originalPrice && <span className="product-card__price-original">S/ {originalPrice.toLocaleString()}</span>}
        </div>

        <button
          type="button"
          className="product-card__add-btn"
          onClick={e => {
            e.stopPropagation();
            if (product) addToCart(product);
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" x2="21" y1="6" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Agregar
        </button>

        {/* Link invisible para accesibilidad */}
        <Link to={id != null ? `/producto/${id}` : "#"} aria-hidden="true" tabIndex={-1} />
      </div>
    </article>
  );
}

export default ProductCard;

