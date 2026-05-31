import "./Categories.css";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CATEGORIES, ALL_PRODUCTS } from "../../data/products";

const CATEGORY_ICONS = {
  electronicos: "💻",
  gaming:       "🎮",
  audio:        "🎧",
  accesorios:   "⌨️",
};

function Categories() {
  const navigate = useNavigate();

  return (
    <section className="categories">
      <div className="categories__inner">
        {/* Header */}
        <div className="categories__header">
          <div className="categories__heading">
            <span className="categories__label">Explorar</span>
            <h2 className="categories__title">Categorías</h2>
            <div className="categories__title-line" aria-hidden="true" />
          </div>

          <button className="categories__see-all" onClick={() => navigate("/catalogo")}>
            Ver todas
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div className="categories__grid">
          {PRODUCT_CATEGORIES.map(cat => (
            <div
              className="category-card"
              key={cat.slug}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/catalogo?categoria=${cat.slug}`)}
              onKeyDown={e => e.key === "Enter" && navigate(`/catalogo?categoria=${cat.slug}`)}
            >
              <div className="category-card__icon" aria-hidden="true">
                {CATEGORY_ICONS[cat.slug]}
              </div>
              <span className="category-card__name">{cat.name}</span>
              <span className="category-card__count">
                {ALL_PRODUCTS.filter(p => p.category === cat.slug).length} productos
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
