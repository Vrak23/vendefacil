import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Catalogo.css";
import ProductCard from "../../components/productCard/ProductCard";
import { ALL_PRODUCTS, PRODUCT_CATEGORIES, CATEGORIES } from "../../data/products";

import { LayoutGrid, Monitor, Gamepad2, Headphones, Mouse } from "lucide-react";


const SORT_OPTIONS = [
  { value: "relevance", label: "Relevancia" },
  { value: "price-asc", label: "Precio: menor" },
  { value: "price-desc", label: "Precio: mayor" },
  { value: "rating", label: "Mejor valorados" },
  { value: "newest", label: "Mas nuevos" },
];

const ITEMS_PER_PAGE = 6;

const normalizeText = text =>
  text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const IconSearch = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/></svg>;
const IconX = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/></svg>;
const IconChevron = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconGrid = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
const IconList = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="8" x2="21" y1="6" y2="6" strokeLinecap="round"/><line x1="8" x2="21" y1="12" y2="12" strokeLinecap="round"/><line x1="8" x2="21" y1="18" y2="18" strokeLinecap="round"/><line x1="3" x2="3.01" y1="6" y2="6" strokeLinecap="round"/><line x1="3" x2="3.01" y1="12" y2="12" strokeLinecap="round"/><line x1="3" x2="3.01" y1="18" y2="18" strokeLinecap="round"/></svg>;
const IconFilter = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconLeft = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconRight = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>;

function FilterSidebar({
  categories,
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  openGroups,
  toggleGroup,
  clearFilters,
  onClose,
  isMobile,
}) {
  const activeCount = (category !== "Todos" ? 1 : 0) + (maxPrice < 5000 ? 1 : 0);

  return (
    <>
      {isMobile && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-lg)" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>Filtros</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex" }}>
            <IconX />
          </button>
        </div>
      )}

      <div className="catalogo__filter-group">
        <div className="catalogo__filter-group-header" onClick={() => toggleGroup("categoria")}>
          <span className="catalogo__filter-group-title">Categoria</span>
          <span className={`catalogo__filter-group-chevron${openGroups.categoria ? " open" : ""}`}>
            <IconChevron />
          </span>
        </div>

        {openGroups.categoria && (
          <div className="catalogo__filter-group-body">
            {categories.map(cat => (
              <button
                key={cat.name}
                className={`catalogo__filter-option${category === cat.name ? " active" : ""}`}
                onClick={() => setCategory(cat.name)}
              >
                <div className="catalogo__filter-option-left">
                  <span className="catalogo__filter-option-icon" aria-hidden="true">
                    {(() => {
                      const Icon = cat.Icon;
                      return <Icon size={16} color="var(--accent-bright)" />;
                    })()}
                  </span>
                  <span className="catalogo__filter-option-name">{cat.label}</span>
                </div>

                <span className="catalogo__filter-option-count">{cat.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="catalogo__filter-group">
        <div className="catalogo__filter-group-header" onClick={() => toggleGroup("precio")}>
          <span className="catalogo__filter-group-title">Precio maximo</span>
          <span className={`catalogo__filter-group-chevron${openGroups.precio ? " open" : ""}`}>
            <IconChevron />
          </span>
        </div>

        {openGroups.precio && (
          <div className="catalogo__filter-group-body">
            <div className="catalogo__price-range">
              <div className="catalogo__price-labels">
                <span>S/ 0</span>
                <span style={{ color: "var(--accent-bright)" }}>S/ {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                className="catalogo__price-slider"
                min={0}
                max={5000}
                step={50}
                value={maxPrice}
                onChange={event => setMaxPrice(Number(event.target.value))}
                style={{ "--val": `${(maxPrice / 5000) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {activeCount > 0 && (
        <button className="catalogo__clear-btn" onClick={clearFilters}>
          Limpiar filtros ({activeCount})
        </button>
      )}

      {isMobile && (
        <button className="btn btn-primary" onClick={onClose} style={{ marginTop: "auto" }}>
          Ver resultados
        </button>
      )}
    </>
  );
}

function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("categoria") ?? "Todos";
  const validInitialCategory = PRODUCT_CATEGORIES.some(cat => cat.slug === initialCategory)
    ? initialCategory
    : "Todos";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(validInitialCategory);
  const [sortBy, setSortBy] = useState("relevance");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [viewMode, setViewMode] = useState("grid");
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({ categoria: true, precio: true });

  const toggleGroup = key =>
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const nextCategory = searchParams.get("categoria") ?? "Todos";
    const isValid = PRODUCT_CATEGORIES.some(cat => cat.slug === nextCategory);
    setCategory(isValid ? nextCategory : "Todos");
    setPage(1);
  }, [searchParams]);

  const setSelectedCategory = nextCategory => {
    setCategory(nextCategory);
    setPage(1);

    if (nextCategory === "Todos") {
      setSearchParams({});
      return;
    }

    setSearchParams({ categoria: nextCategory });
  };

  const searchTerm = useMemo(() => normalizeText(search), [search]);

  const productsBySearch = useMemo(() => {
    if (!searchTerm) return ALL_PRODUCTS;

    return ALL_PRODUCTS.filter(product =>
      normalizeText(`${product.title} ${product.categoryName}`).includes(searchTerm)
    );
  }, [searchTerm]);

  const categories = useMemo(() => {
    const CATEGORY_LUCIDE_ICONS = {
      todos: LayoutGrid,
      electronicos: Monitor,
      gaming: Gamepad2,
      audio: Headphones,
      accesorios: Mouse,
    };

    return [
      {
        name: "Todos",
        label: "Todos",
        Icon: CATEGORY_LUCIDE_ICONS.todos,
        count: productsBySearch.length,
      },
      ...PRODUCT_CATEGORIES.map((cat) => ({
        name: cat.slug,
        label: cat.name,
        Icon: CATEGORY_LUCIDE_ICONS[cat.slug],
        count: productsBySearch.filter(
          (product) => product.category === cat.slug
        ).length,
      })),
    ];
  }, [productsBySearch]);


  const clearFilters = () => {
    setSelectedCategory("Todos");
    setMaxPrice(5000);
    setPage(1);
  };

  const clearAll = () => {
    setSearch("");
    clearFilters();
  };

  const filtered = useMemo(() => {
    const result = productsBySearch.filter(product => {
      const matchesCategory = category === "Todos" || product.category === category;
      const matchesPrice = product.price <= maxPrice;
      return matchesCategory && matchesPrice;
    });

    switch (sortBy) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "rating":
        return [...result].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...result].sort((a, b) => Number(b.isNew) - Number(a.isNew));
      default:
        return result;
    }
  }, [productsBySearch, category, maxPrice, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const categoryLabel =
    PRODUCT_CATEGORIES.find(cat => cat.slug === category)?.name ?? category;

  const activeTags = [
    category !== "Todos" && {
      key: "cat",
      label: categoryLabel,
      clear: () => setSelectedCategory("Todos"),
    },
    maxPrice < 5000 && {
      key: "price",
      label: `Hasta S/ ${maxPrice}`,
      clear: () => {
        setMaxPrice(5000);
        setPage(1);
      },
    },
    search && {
      key: "q",
      label: `"${search}"`,
      clear: () => {
        setSearch("");
        setPage(1);
      },
    },
  ].filter(Boolean);

  const goToPage = nextPage => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="catalogo" id="catalogo">
      <div className="catalogo__hero">
        <div className="catalogo__hero-bg" aria-hidden="true">
          <div className="catalogo__hero-glow" />
          <div className="catalogo__hero-grid" />
        </div>

        <div className="catalogo__hero-inner">
          <nav className="catalogo__breadcrumb" aria-label="Ruta de navegacion">
            <Link to="/">Inicio</Link>
            <span className="catalogo__breadcrumb-sep">/</span>
            <span className="catalogo__breadcrumb-current">Catalogo</span>
          </nav>

          <h1 className="catalogo__title">
            Explora el <span>catalogo</span>
          </h1>

          <p className="catalogo__subtitle">
            Tecnologia premium seleccionada para quienes exigen lo mejor.
          </p>

          <div className="catalogo__search-wrap">
            <span className="catalogo__search-icon" aria-hidden="true">
              <IconSearch />
            </span>
            <input
              type="search"
              className="catalogo__search"
              placeholder="Buscar productos..."
              value={search}
              onChange={event => {
                setSearch(event.target.value);
                setPage(1);
              }}
              aria-label="Buscar productos"
            />
            {search && (
              <button
                className="catalogo__search-clear"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                aria-label="Limpiar busqueda"
              >
                <IconX />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="catalogo__body">
        {mobileOpen && (
          <div
            className="catalogo__backdrop"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}

        <aside
          className={`catalogo__sidebar${mobileOpen ? " is-open" : ""}`}
          aria-label="Filtros"
          aria-modal={mobileOpen ? "true" : undefined}
        >
          <FilterSidebar
            categories={categories}
            category={category}
            setCategory={setSelectedCategory}
            maxPrice={maxPrice}
            setMaxPrice={value => {
              setMaxPrice(value);
              setPage(1);
            }}
            openGroups={openGroups}
            toggleGroup={toggleGroup}
            clearFilters={clearFilters}
            isMobile={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />
        </aside>

        <div className="catalogo__main">
          <div className="catalogo__toolbar">
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", flexWrap: "wrap" }}>
              <button
                className="catalogo__filter-toggle"
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir filtros"
              >
                <IconFilter />
                Filtros
                {activeTags.length > 0 && (
                  <span className="catalogo__filter-badge">{activeTags.length}</span>
                )}
              </button>
              <span className="catalogo__count">
                <strong>{filtered.length}</strong> producto{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="catalogo__toolbar-right">
              <select
                className="catalogo__sort"
                value={sortBy}
                onChange={event => {
                  setSortBy(event.target.value);
                  setPage(1);
                }}
                aria-label="Ordenar por"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                className={`catalogo__view-btn${viewMode === "grid" ? " active" : ""}`}
                onClick={() => setViewMode("grid")}
                aria-label="Vista grilla"
                aria-pressed={viewMode === "grid"}
              >
                <IconGrid />
              </button>
              <button
                className={`catalogo__view-btn${viewMode === "list" ? " active" : ""}`}
                onClick={() => setViewMode("list")}
                aria-label="Vista lista"
                aria-pressed={viewMode === "list"}
              >
                <IconList />
              </button>
            </div>
          </div>

          {activeTags.length > 0 && (
            <div className="catalogo__active-filters" role="group" aria-label="Filtros activos">
              {activeTags.map(tag => (
                <span key={tag.key} className="catalogo__active-tag">
                  {tag.label}
                  <button onClick={tag.clear} aria-label={`Quitar filtro: ${tag.label}`}>
                    <IconX />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className={`catalogo__grid${viewMode === "list" ? " list-view" : ""}`}>
            {paginated.length > 0 ? (
              paginated.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="catalogo__empty">
                <span className="catalogo__empty-icon">?</span>
                <p className="catalogo__empty-title">Sin resultados</p>
                <p className="catalogo__empty-sub">
                  Intenta con otro termino o ajusta los filtros.
                </p>
                <button className="btn btn-ghost" onClick={clearAll}>
                  Limpiar todo
                </button>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <nav className="catalogo__pagination" aria-label="Paginacion">
              <button
                className="catalogo__page-btn"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Pagina anterior"
              >
                <IconLeft />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(nextPage => (
                <button
                  key={nextPage}
                  className={`catalogo__page-btn${currentPage === nextPage ? " active" : ""}`}
                  onClick={() => goToPage(nextPage)}
                  aria-label={`Pagina ${nextPage}`}
                  aria-current={currentPage === nextPage ? "page" : undefined}
                >
                  {nextPage}
                </button>
              ))}

              <button
                className="catalogo__page-btn"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Pagina siguiente"
              >
                <IconRight />
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

export default Catalogo;
