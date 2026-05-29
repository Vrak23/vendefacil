import "./Tendencias.css";
import ProductCard from "../../components/productCard/ProductCard";
import { FEATURED_PRODUCTS } from "../../data/products";

function Tendencias() {
  return (
    <section className="tendencias">
      <div className="tendencias__inner">

        <div className="tendencias__header">
          <span className="tendencias__label">
            Más vendidos
          </span>

          <h1 className="tendencias__title">
            Tendencias
          </h1>

          <p className="tendencias__subtitle">
            Los productos más populares de VendeFácil.
          </p>
        </div>

        <div className="tendencias__grid">
          {FEATURED_PRODUCTS.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Tendencias;