import { useState } from "react";
import "./Products.css";
import ProductCard from "../productCard/ProductCard";

import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";
import product4 from "../../assets/product4.jpg";
import product5 from "../../assets/product5.jpg";
import product6 from "../../assets/product6.jpg";

const ALL_PRODUCTS = [
  { title: "Audífonos Gamer",    price: 299,  image: product1, category: "Audio",       isNew: true,  discount: null, rating: 4.8, reviews: 124 },
  { title: "Laptop Gaming",      price: 4500, image: product2, category: "Gaming",      isNew: false, discount: 10,   rating: 4.9, reviews: 87  },
  { title: "Teclado Mecánico",   price: 350,  image: product3, category: "Gaming",      isNew: true,  discount: null, rating: 4.6, reviews: 203 },
  { title: "Mouse RGB",          price: 120,  image: product4, category: "Accesorios",  isNew: false, discount: 15,   rating: 4.5, reviews: 310 },
  { title: "Monitor UltraWide",  price: 1299, image: product5, category: "Electrónicos",isNew: false, discount: null, rating: 4.7, reviews: 56  },
  { title: "Smartwatch Pro",     price: 499,  image: product6, category: "Accesorios",  isNew: true,  discount: null, rating: 4.4, reviews: 98  },
];

const FILTERS = ["Todos", "Gaming", "Audio", "Electrónicos", "Accesorios"];

function Products() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filtered = activeFilter === "Todos"
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <section className="products">
      <div className="products__inner">

        {/* Header */}
        <div className="products__header">
          <div className="products__heading">
            <span className="products__label">Colección</span>
            <h2 className="products__title">Productos Destacados</h2>
            <div className="products__title-line" aria-hidden="true" />
          </div>
        </div>

        {/* Filtros */}
        <div className="products__filters" role="tablist" aria-label="Filtrar productos">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`products__filter${activeFilter === f ? " active" : ""}`}
              onClick={() => setActiveFilter(f)}
              role="tab"
              aria-selected={activeFilter === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="products__grid">
          {filtered.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              price={product.price}
              image={product.image}
              isNew={product.isNew}
              discount={product.discount}
              rating={product.rating}
              reviews={product.reviews}
            />
          ))}
        </div>

        {/* Footer CTA */}
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