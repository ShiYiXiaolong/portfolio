import { useState } from "react";
import { useLanguage } from "./hooks/useLanguage";
import { useTheme } from "./hooks/useTheme";
import "./App.css";

const LANGS = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
];

const NAV_KEYS = ["home", "services", "culture", "about", "process", "faq", "contact"];
const CONTACT_EMAIL = "trade@liunero.com";
const EMPTY_FORM = {
  name: "",
  company: "",
  email: "",
  interest: "",
  message: "",
  botcheck: "",
};

export default function App() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formStatus, setFormStatus] = useState("idle");
  const [emailCopied, setEmailCopied] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  const scrollTo = (id) => {
    closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (formStatus === "error" || formStatus === "success") setFormStatus("idle");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      setEmailCopied(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formStatus === "sending") return;
    if (form.botcheck) {
      setFormStatus("success");
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setFormStatus("error");
      return;
    }

    setFormStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Inquiry from ${form.name || "website"}`,
          from_name: form.name,
          name: form.name,
          company: form.company,
          email: form.email,
          replyto: form.email,
          interest: form.interest,
          message: form.message,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submit failed");
      }
      setForm(EMPTY_FORM);
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <>
      <nav>
        <div className="logo">Liu Nero</div>

        <div className="nav-links">
          {NAV_KEYS.map((key) => (
            <a key={key} href={`#${key}`}>
              {t.nav[key]}
            </a>
          ))}
        </div>

        <div className="nav-right">
          {LANGS.map(({ code, label }) => (
            <button
              key={code}
              className={`lang-btn ${lang === code ? "active" : ""}`}
              onClick={() => setLang(code)}
            >
              {label}
            </button>
          ))}
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === "dark" ? "☀ Light" : "🌙 Dark"}
          </button>
          <button
            className={`ham ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu open">
          {NAV_KEYS.map((key) => (
            <a key={key} href={`#${key}`} onClick={closeMenu}>
              {t.nav[key]}
            </a>
          ))}
        </div>
      )}

      <div className="wrap">
        <div className="hero" id="home">
          <div>
            <div className="hero-label">{t.hero.label}</div>
            <h1 className="hero-title">
              {t.hero.title}
              <span>{t.hero.titleSpan}</span>
            </h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <button className="btn-p" onClick={() => scrollTo("contact")}>
              {t.hero.cta}
            </button>
            <button className="btn-g" onClick={() => scrollTo("services")}>
              {t.hero.ctaSecondary}
            </button>
          </div>
          <div className="hero-grid">
            {t.hero.cards.map((card, i) => (
              <div key={i} className="nc">
                <div className="nc-title">{card.title}</div>
                <div className="nc-sub">{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        <section className="sec" id="services">
          <div className="sec-label">{t.services.label}</div>
          <div className="sec-title">{t.services.title}</div>
          <div className="srv-grid">
            {t.services.items.map((item, i) => (
              <div
                key={i}
                className={`srv${i === t.services.items.length - 1 ? " srv-last" : ""}`}
              >
                <div className="srv-num">{item.num}</div>
                <div className="srv-title">{item.title}</div>
                <div className="srv-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="sec" id="process">
          <div className="sec-label">{t.process.label}</div>
          <div className="sec-title">{t.process.title}</div>
          {t.process.items.map((item, i) => (
            <div key={i} className="proc-item">
              <div className="proc-n">{item.num}</div>
              <div>
                <div className="proc-title">{item.title}</div>
                <div className="proc-desc">{item.desc}</div>
                <span className="proc-tag">{item.tag}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="sec" id="about">
          <div className="sec-label">{t.about.label}</div>
          <div className="sec-title">{t.about.title}</div>
          <div className="about-grid">
            <div className="about-text">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
              <p>{t.about.p4}</p>
            </div>
            <div className="about-right">
              <div className="about-photo-wrap">
                <div className="about-photo-placeholder has-photo">
                  <img
                    className="about-photo"
                    src={`${import.meta.env.BASE_URL}portrait.jpg`}
                    alt={t.about.photoCaption}
                  />
                </div>
                <div className="about-photo-caption">{t.about.photoCaption}</div>
              </div>
              <div className="about-box" style={{ marginTop: "1rem" }}>
                <div className="about-person">
                  <div className="avatar">刘</div>
                  <div>
                    <div className="person-name">刘</div>
                    <div className="person-role">{t.about.partnerRole}</div>
                    <div className="lang-tags">
                      <span className="lang-tag">中文</span>
                      <span className="lang-tag">EN</span>
                    </div>
                  </div>
                </div>
                <div
                  className="about-note"
                  style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #222" }}
                >
                  {t.about.partnerNote}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="principles">
          <div className="sec-label">{t.principles.label}</div>
          <div className="sec-title">{t.principles.title}</div>
          <div className="principles-grid">
            {t.principles.items.map((item, i) => (
              <div key={i} className="prin-card">
                <div className="prin-num">—</div>
                <div className="prin-title">{item.title}</div>
                <div className="prin-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="sec" id="culture">
          <div className="sec-label">{t.culture.label}</div>
          <div className="sec-title">{t.culture.title}</div>
          <p className="culture-intro">{t.culture.intro}</p>
          <div className="culture-grid">
            {t.culture.items.map((item, i) => (
              <div key={i} className="cult-card">
                <div className="cult-vs">{item.vs}</div>
                <div className="cult-title">{item.title}</div>
                <div className="cult-desc">{item.desc}</div>
                <div className="cult-solution">
                  <div className="cult-solution-label">{t.culture.bridgeLabel}</div>
                  {item.solution}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sec" id="confidentiality">
          <div className="sec-label">{t.confidentiality.label}</div>
          <div className="sec-title">{t.confidentiality.title}</div>
          <div className="conf-block">
            <div>
              <div className="conf-title">{t.confidentiality.blockTitle}</div>
              <div className="conf-desc">
                {t.confidentiality.desc1}{" "}
                <strong className="conf-strong">{t.confidentiality.desc1Strong}</strong>
                {t.confidentiality.desc1End}
                <br />
                <br />
                {t.confidentiality.desc2}
              </div>
              <div className="conf-pills">
                {t.confidentiality.pills.map((pill, i) => (
                  <span key={i} className="conf-pill">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="faq">
          <div className="sec-label">{t.faq.label}</div>
          <div className="sec-title">{t.faq.title}</div>
          <div className="faq-list">
            {t.faq.items.map((item, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? "open" : ""}`}
                onClick={() => toggleFaq(i)}
              >
                <div className="faq-q">
                  {item.q}
                  <span className="faq-icon">+</span>
                </div>
                <div className="faq-a">
                  <div className="faq-a-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sec" id="contact">
          <div className="sec-label">{t.contact.label}</div>
          <div className="sec-title">{t.contact.title}</div>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-langs">
                {LANGS.map(({ code, label }) => (
                  <div key={code} className="contact-lang-badge">
                    <strong>{label}</strong>
                    {code === "de" ? " Deutsch" : code === "en" ? " English" : " Mandarin"}
                  </div>
                ))}
              </div>
              <div className="c-item">
                <div>
                  <div className="c-label">{t.contact.emailLabel}</div>
                  <button
                    type="button"
                    className="c-val c-link c-copy"
                    onClick={copyEmail}
                    title={t.contact.emailCopyHint}
                  >
                    {emailCopied ? t.contact.emailCopied : CONTACT_EMAIL}
                  </button>
                </div>
              </div>
              <div className="c-item">
                <div>
                  <div className="c-label">{t.contact.locationLabel}</div>
                  <div className="c-val">{t.contact.locationVal}</div>
                </div>
              </div>
              <div className="c-item">
                <div>
                  <div className="c-label">{t.contact.wechatLabel}</div>
                  <div className="c-val">{t.contact.wechatVal}</div>
                </div>
              </div>
              <div className="c-item">
                <div>
                  <div className="c-label">{t.contact.responseLabel}</div>
                  <div className="c-val">{t.contact.responseVal}</div>
                </div>
              </div>
              <div className="contact-note">{t.contact.note}</div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                className="hp"
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                value={form.botcheck}
                onChange={updateField("botcheck")}
              />
              <input
                className="cf-input"
                placeholder={t.contact.namePlaceholder}
                type="text"
                name="name"
                value={form.name}
                onChange={updateField("name")}
                required
                disabled={formStatus === "sending"}
              />
              <input
                className="cf-input"
                placeholder={t.contact.companyPlaceholder}
                type="text"
                name="company"
                value={form.company}
                onChange={updateField("company")}
                disabled={formStatus === "sending"}
              />
              <input
                className="cf-input"
                placeholder={t.contact.emailPlaceholder}
                type="email"
                name="email"
                value={form.email}
                onChange={updateField("email")}
                required
                disabled={formStatus === "sending"}
              />
              <select
                className="cf-input"
                name="interest"
                value={form.interest}
                onChange={updateField("interest")}
                required
                disabled={formStatus === "sending"}
              >
                <option value="" disabled>
                  {t.contact.selectPlaceholder}
                </option>
                {t.contact.selectOptions.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <textarea
                className="cf-input"
                placeholder={t.contact.messagePlaceholder}
                name="message"
                value={form.message}
                onChange={updateField("message")}
                required
                disabled={formStatus === "sending"}
              />
              <button className="btn-p" type="submit" disabled={formStatus === "sending"}>
                {formStatus === "sending" ? t.contact.submitting : t.contact.submit}
              </button>
              {formStatus === "success" && (
                <p className="form-status ok">{t.contact.success}</p>
              )}
              {formStatus === "error" && (
                <p className="form-status err">{t.contact.error}</p>
              )}
            </form>
          </div>
        </section>
      </div>

      <footer>
        <div className="ft">{t.footer.copy}</div>
        <div className="ft-langs">
          {LANGS.map(({ code, label }) => (
            <span
              key={code}
              className={`ft-l ${lang === code ? "on" : ""}`}
              onClick={() => setLang(code)}
            >
              {label}
            </span>
          ))}
        </div>
      </footer>
    </>
  );
}
