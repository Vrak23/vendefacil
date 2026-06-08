import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Soporte.css";

const CONTACT_CARDS = [
  {
    id: "whatsapp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-
        .173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.
        13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.
        612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 
        1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.
        712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.528 5.837L.057 23.882a.5.5 0 0 0 .61.632l6.228-1.634A11.945 11.945 
        0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.073-1.384l-.363-.217-3.762.987.998-3.648-.236-.374A9.944 
        9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+51 902 913 653",
    description: "Respuesta inmediata en horario de atención.",
    href: "https://wa.me/51902913653",
    cta: "Abrir chat",
    color: "#25d366",
    colorBg: "rgba(37, 211, 102, 0.08)",
    colorBorder: "rgba(37, 211, 102, 0.25)",
  },
  {
    id: "correo",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: "Correo",
    value: "rodrigodanielllanos2@gmail.com",
    description: "Te respondemos en menos de 24 horas.",
    href: "mailto:rodrigodanielllanos2@gmail.com",
    cta: "Enviar correo",
    color: "var(--accent-bright)",
    colorBg: "var(--accent-subtle)",
    colorBorder: "var(--border-strong)",
  },
  {
    id: "atencion",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 20a6 6 0 0 0-12 0" />
        <circle cx="12" cy="10" r="4" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="18" cy="6" r="1" fill="currentColor" />
        <path d="M6 6C6 3.79 8.69 2 12 2s6 1.79 6 4" />
      </svg>
    ),
    label: "Atención al cliente",
    value: "Lun–Vie · 9:00 – 18:00",
    description: "Agentes disponibles para ayudarte en tiempo real.",
    href: null,
    cta: "Próximamente",
    color: "#f59e0b",
    colorBg: "rgba(245, 158, 11, 0.08)",
    colorBorder: "rgba(245, 158, 11, 0.25)",
  },
];

const FAQS = [
  {
    q: "¿Cuánto demora el envío?",
    a: "Los envíos dentro de Lima Metropolitana tardan entre 24 y 48 horas. Para provincias, el plazo estimado es de 3 a 5 días hábiles dependiendo de la zona.",
  },
  {
    q: "¿Puedo devolver un producto?",
    a: "Sí. Tienes hasta 7 días calendario desde la recepción del pedido para solicitar un cambio o devolución, siempre que el producto esté en su estado original y con empaque.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Aceptamos tarjetas Visa y Mastercard (crédito y débito), transferencia bancaria, Yape y Plin. Todos los pagos son procesados de forma segura.",
  },
  {
    q: "¿Cómo hago seguimiento a mi pedido?",
    a: "Una vez confirmado tu pedido, recibirás un correo con el número de guía y el enlace de seguimiento del courier asignado. También puedes contactarnos por WhatsApp para consultar el estado.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`soporte__faq-item${open ? " open" : ""}`}>
      <button
        className="soporte__faq-q"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <svg
          className="soporte__faq-chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && <p className="soporte__faq-a">{a}</p>}
    </div>
  );
}

function Soporte() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: "",
  });
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          nombre: form.nombre,
          correo: form.correo,
          asunto: form.asunto,
          mensaje: form.mensaje,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setSentEmail(form.correo);
      setSent(true);

      setForm({
        nombre: "",
        correo: "",
        asunto: "",
        mensaje: "",
      });
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("No se pudo enviar el mensaje.");
    }
  };

  return (
    <div className="soporte">
      {/* ── Hero ── */}
      <div className="soporte__hero">
        <div className="soporte__hero-bg" aria-hidden="true">
          <div className="soporte__hero-glow" />
          <div className="soporte__hero-grid" />
        </div>
        <div className="soporte__hero-inner">
          <span className="soporte__hero-label">Centro de ayuda</span>
          <h1 className="soporte__hero-title">
            ¿En qué podemos <span>ayudarte?</span>
          </h1>
          <p className="soporte__hero-sub">
            Estamos disponibles por varios canales. Elige el que más te
            convenga.
          </p>
        </div>
      </div>

      <div className="soporte__inner">
        {/* ── Tarjetas de contacto ── */}
        <div className="soporte__cards">
          {CONTACT_CARDS.map((card) => (
            <div
              key={card.id}
              className="soporte__card"
              style={{
                "--card-color": card.color,
                "--card-color-bg": card.colorBg,
                "--card-color-border": card.colorBorder,
              }}
            >
              <div className="soporte__card-icon">{card.icon}</div>
              <div className="soporte__card-body">
                <span className="soporte__card-label">{card.label}</span>
                <strong className="soporte__card-value">{card.value}</strong>
                <p className="soporte__card-desc">{card.description}</p>
              </div>
              {card.href ? (
                <a
                  href={card.href}
                  className="soporte__card-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {card.cta}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              ) : (
                <span className="soporte__card-cta soporte__card-cta--disabled">
                  {card.cta}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* ── FAQ + Formulario ── */}
        <div className="soporte__bottom">
          {/* FAQ */}
          <div className="soporte__faq">
            <div className="soporte__section-header">
              <span className="soporte__section-label">
                Preguntas frecuentes
              </span>
              <h2 className="soporte__section-title">FAQ</h2>
              <div className="soporte__section-line" aria-hidden="true" />
            </div>
            <div className="soporte__faq-list">
              {FAQS.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </div>

          {/* Formulario */}
          <div className="soporte__form-wrap">
            <div className="soporte__section-header">
              <span className="soporte__section-label">Escríbenos</span>
              <h2 className="soporte__section-title">Formulario</h2>
              <div className="soporte__section-line" aria-hidden="true" />
            </div>

            {sent ? (
              <div className="soporte__form-success">
                <span className="soporte__form-success-icon" aria-hidden="true">
                  ✅
                </span>
                <h3>Mensaje enviado</h3>
                <p>
                  Te responderemos a <strong>{sentEmail}</strong> en menos de
                  24 horas.
                </p>
                <button
                  className="btn btn-ghost"
                  onClick={() => setSent(false)}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                className="soporte__form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="soporte__form-row">
                  <div className="soporte__field">
                    <label className="soporte__label" htmlFor="nombre">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      className="soporte__input"
                      placeholder="Tu nombre completo"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="soporte__field">
                    <label className="soporte__label" htmlFor="correo">
                      Correo
                    </label>
                    <input
                      id="correo"
                      name="correo"
                      type="email"
                      className="soporte__input"
                      placeholder="tu@correo.com"
                      value={form.correo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="soporte__field">
                  <label className="soporte__label" htmlFor="asunto">
                    Asunto
                  </label>
                  <input
                    id="asunto"
                    name="asunto"
                    type="text"
                    className="soporte__input"
                    placeholder="¿Sobre qué nos escribes?"
                    value={form.asunto}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="soporte__field">
                  <label className="soporte__label" htmlFor="mensaje">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    className="soporte__input soporte__textarea"
                    placeholder="Cuéntanos tu consulta con el mayor detalle posible..."
                    rows={5}
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary soporte__submit"
                >
                  Enviar mensaje
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="16"
                    height="16"
                  >
                    <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Soporte;
