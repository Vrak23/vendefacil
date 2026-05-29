import "./Categories.css";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  {
    name: "Electrónicos",
    slug: "electronicos",
    icon: "💻",
    count: "340 productos",
  },
  {
    name: "Gaming",
    slug: "gaming",
    icon: "🎮",
    count: "218 productos",
  },
  {
    name: "Audio",
    slug: "audio",
    icon: "🎧",
    count: "95 productos",
  },
  {
    name: "Accesorios",
    slug: "accesorios",
    icon: "⌨️",
    count: "172 productos",
  },
];

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

          <button className="categories__see-all">
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
          {CATEGORIES.map((cat, i) => (
            <div
              className="category-card"
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/catalogo?categoria=${cat.slug}`)}
            >
              <div className="category-card__icon" aria-hidden="true">
                {cat.icon}
              </div>
              <span className="category-card__name">{cat.name}</span>
              <span className="category-card__count">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
