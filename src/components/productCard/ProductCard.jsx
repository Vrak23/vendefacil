import "./ProductCard.css";
import ProductCard from "../productCard/ProductCard";
import { FEATURED_PRODUCTS } from "../../data/products";

function Products() {
  return (
    <section className="products">
      <div className="products__inner">

        <div className="products__header">
          <div className="products__heading">
            <span className="products__label">Colección</span>
            <h2 className="products__title">Productos Destacados</h2>
            <div className="products__title-line" aria-hidden="true" />
          </div>
        </div>

        <div className="products__grid">
          {FEATURED_PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="products__footer">
          <button className="btn btn-ghost">
            Ver todos los productos
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}

export default Products;