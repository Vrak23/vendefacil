import { Link } from "react-router-dom";
import { useCart } from "../../context/useCart";
import "./Carrito.css";

function Carrito() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <section className="carrito">
      <div className="carrito__inner">
        <header className="carrito__header">
          <div>
            <span className="carrito__label">Compra</span>
            <h1 className="carrito__title">Carrito</h1>
          </div>

          <Link to="/#catalogo" className="btn btn-ghost">
            Seguir comprando
          </Link>
        </header>

        {cartItems.length === 0 ? (
          <div className="carrito__empty">
            <div className="carrito__empty-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="3" x2="21" y1="6" y2="6" strokeLinecap="round" />
                <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
              </svg>
            </div>
            <h2>Tu carrito esta vacio</h2>
            <p>Agrega productos desde el catalogo para verlos aqui.</p>
            <Link to="/#catalogo" className="btn btn-primary">
              Ir al catalogo
            </Link>
          </div>
        ) : (
          <div className="carrito__layout">
            <div className="carrito__items">
              {cartItems.map(item => (
                <article className="carrito__item" key={item.id}>
                  <img
                    className="carrito__item-image"
                    src={item.image}
                    alt={item.title}
                  />

                  <div className="carrito__item-info">
                    {item.category && (
                      <span className="carrito__item-category">
                        {item.category}
                      </span>
                    )}
                    <h2 className="carrito__item-title">{item.title}</h2>
                    <span className="carrito__item-price">
                      S/ {item.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="carrito__quantity" aria-label="Cantidad">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label={`Restar ${item.title}`}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => addToCart(item)}
                      aria-label={`Sumar ${item.title}`}
                    >
                      +
                    </button>
                  </div>

                  <span className="carrito__item-subtotal">
                    S/ {(item.price * item.quantity).toLocaleString()}
                  </span>

                  <button
                    className="carrito__remove"
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Eliminar ${item.title}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                </article>
              ))}
            </div>

            <aside className="carrito__summary" aria-label="Resumen del carrito">
              <h2>Resumen</h2>

              <div className="carrito__summary-row">
                <span>Productos</span>
                <strong>{cartCount}</strong>
              </div>

              <div className="carrito__summary-row">
                <span>Subtotal</span>
                <strong>S/ {cartTotal.toLocaleString()}</strong>
              </div>

              <div className="carrito__summary-total">
                <span>Total</span>
                <strong>S/ {cartTotal.toLocaleString()}</strong>
              </div>

              <button className="btn btn-primary carrito__checkout" type="button">
                Finalizar compra
              </button>

              <button
                className="carrito__clear"
                type="button"
                onClick={clearCart}
              >
                Vaciar carrito
              </button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export default Carrito;
