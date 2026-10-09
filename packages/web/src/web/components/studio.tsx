import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, ArrowRight, ArrowDown, Menu, X, Plus, Minus } from "lucide-react";
import { nav, serviceLinks, previews, projects } from "../lib/content";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Lumen Pulse Media home">
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span>
        LUMEN PULSE<small>MEDIA</small>
      </span>
    </Link>
  );
}
export function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link href={href} className={`button ${secondary ? "secondary" : ""}`}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function Photo({
  name,
  alt,
  className = "",
  eager = false,
}: {
  name: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      className={className}
      src={`/images/${name}-1600.webp`}
      srcSet={`/images/${name}-640.webp 640w, /images/${name}-1600.webp 1600w`}
      sizes="(max-width: 700px) 100vw, 65vw"
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
    />
  );
}
export function useFocusDialog(
  open: boolean,
  ref: React.RefObject<HTMLElement | null>,
  close: () => void,
) {
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      Array.from(
        ref.current?.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex="0"]',
        ) || [],
      );
    focusable()[0]?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const f = focusable();
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1]?.focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0]?.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [open, ref, close]);
}
export function Navbar() {
  const [path] = useLocation();
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef(() => setOpen(false)).current;
  useFocusDialog(open, dialog, close);
  useEffect(() => {
    setOpen(false);
    setDropdown(false);
  }, [path]);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="navbar">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map((n) =>
            n.name === "Services" ? (
              <div
                className="dropdown"
                key={n.name}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setDropdown(false);
                }}
              >
                <div className="service-nav">
                  <Link href={n.url} className={path.startsWith("/services") ? "active" : ""}>
                    Services
                  </Link>
                  <button
                    aria-label="Toggle services menu"
                    aria-expanded={dropdown}
                    onClick={() => setDropdown(!dropdown)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setDropdown(false);
                    }}
                  >
                    <Plus size={12} />
                  </button>
                </div>
                {dropdown && (
                  <div className="dropdown-panel">
                    {serviceLinks.map((s) => (
                      <Link key={s.url} href={s.url} onClick={() => setDropdown(false)}>
                        {s.name}
                        <ArrowUpRight size={14} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={n.url} href={n.url} className={path === n.url ? "active" : ""}>
                {n.name}
              </Link>
            ),
          )}
        </nav>
        <div className="nav-actions">
          <Button href="/contact">Start a project</Button>
          <button
            className="menu-toggle"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>
      {open && (
        <dialog
          open
          className="mobile-menu"
          aria-modal="true"
          aria-label="Navigation menu"
          ref={dialog}
        >
          <div className="mobile-top">
            <span className="eyebrow">Lumen Pulse Media</span>
            <button className="icon-button" onClick={close} aria-label="Close menu">
              <X />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {nav.map((n, i) => (
              <div className="mobile-nav-row" key={n.url}>
                <Link href={n.url} onClick={close}>
                  <span className="small-number">0{i + 1}</span>
                  {n.name}
                </Link>
                {n.name === "Services" && (
                  <button
                    className="icon-button"
                    aria-label="Expand service links"
                    aria-expanded={mobileServices}
                    onClick={() => setMobileServices(!mobileServices)}
                  >
                    {mobileServices ? <Minus /> : <Plus />}
                  </button>
                )}
                {n.name === "Services" && mobileServices && (
                  <div className="mobile-services">
                    {serviceLinks.map((s) => (
                      <Link href={s.url} key={s.url} onClick={close}>
                        {s.name}
                        <ArrowUpRight size={16} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <Button href="/contact">Start a project</Button>
          <a href="mailto:hello@lumenpulse.co.za" className="mobile-email">
            hello@lumenpulse.co.za
          </a>
        </dialog>
      )}
    </>
  );
}
export function SectionHeading({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span>{number} /</span> {label}
      </div>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}
export function ServiceGrid() {
  return (
    <div className="service-grid">
      {previews.map((s, i) => (
        <Link href={s.url} className="service-card" key={s.title}>
          <div className="service-image">
            <Photo name={s.image} alt={`${s.title} temporary visual reference`} />
            <span className="image-number">0{i + 1}</span>
            <span className="circle-arrow">
              <ArrowUpRight size={22} />
            </span>
          </div>
          <div className="service-card-title">
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
export function PortfolioGrid({ full = false }: { full?: boolean }) {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef(() => setSelected(null)).current;
  useFocusDialog(!!selected, dialog, close);
  const list = (full ? projects : projects.slice(0, 4)).filter(
    (p) => category === "All" || p.category === category,
  );
  return (
    <>
      {full && (
        <div className="filters" aria-label="Filter visual studies">
          {[
            "All",
            "Photography",
            "Video",
            "Design",
            "Animation",
            "Illustration",
            "Web",
            "Events",
          ].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={category === c ? "selected" : ""}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="portfolio-grid">
        {list.map((p, i) => (
          <button
            className={`portfolio-card portfolio-${i % 4}`}
            key={p.id}
            onClick={() => setSelected(p)}
          >
            <div className="portfolio-image">
              <Photo name={p.image} alt={p.description} />
              <span className="study-label">Visual study</span>
              <span className="circle-arrow">
                <ArrowUpRight />
              </span>
            </div>
            <div className="portfolio-caption">
              <h3>{p.title}</h3>
              <span>{p.category}</span>
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <div className="dialog-backdrop">
          <dialog
            open
            className="project-dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            ref={dialog}
          >
            <button
              className="dialog-close icon-button"
              aria-label="Close project preview"
              onClick={close}
            >
              <X />
            </button>
            <Photo name={selected.image} alt={selected.description} />
            <div className="project-copy">
              <span className="eyebrow">{selected.category} / Temporary visual study</span>
              <h2 id="project-title">{selected.title}</h2>
              <p>{selected.description}</p>
              <p className="muted">
                Design-stage stock reference. This is not a commissioned Lumen Pulse Media project
                or a claim of client work.
              </p>
              <Button href="/contact">Discuss something like this</Button>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}
export function Approach() {
  return (
    <section className="approach section">
      <div>
        <SectionHeading number="03" label="Our approach" />
        <h2>
          Strategy meets
          <br />
          <span className="serif">creativity.</span>
        </h2>
      </div>
      <div className="approach-copy">
        <p>
          We bridge the gap between strategy and creativity, working with forward-thinking
          Advertising & Marketing Agencies, Creative Influencers and Collaborators.
        </p>
        <p className="muted">
          Authentic narratives. Visual impact. Meaningful connections. Creative work aligned with
          brand objectives.
        </p>
        <div className="approach-tags">
          {["Authentic stories", "Visual impact", "Meaningful connections", "Brand objectives"].map(
            (t, i) => (
              <span key={t}>
                <small>0{i + 1}</small>
                {t}
              </span>
            ),
          )}
        </div>
        <Link href="/about" className="text-link">
          The way we see things
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
export function CTASection() {
  return (
    <section className="cta-section">
      <div className="eyebrow">
        <span className="live-dot" /> Your next idea starts here
      </div>
      <div className="cta-line">
        <h2>
          LET’S MAKE
          <br />
          SOMETHING <span className="serif">matter.</span>
        </h2>
        <Link href="/contact" className="cta-circle" aria-label="Start a project">
          <ArrowUpRight />
        </Link>
      </div>
      <div className="cta-bottom">
        <p>
          From a spark of an idea to a shared experience.
          <br />
          Let’s create something extraordinary.
        </p>
        <a href="mailto:hello@lumenpulse.co.za">
          hello@lumenpulse.co.za <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Brand />
        <p>
          Illuminating stories.
          <br />
          Shaping experiences.
        </p>
        <div>
          <a href="tel:+27711435683">071 143 5683</a>
          <a href="mailto:hello@lumenpulse.co.za">hello@lumenpulse.co.za</a>
          <a href="https://www.lumenpulse.co.za">www.lumenpulse.co.za</a>
        </div>
        <nav aria-label="Footer navigation">
          {nav.slice(1).map((n) => (
            <Link href={n.url} key={n.url}>
              {n.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Lumen Pulse Media</span>
        <span>Light × Rhythm × Story</span>
        <a href="#main" className="text-link">
          Back to top <ArrowUpRight size={15} />
        </a>
      </div>
      <p className="asset-note">
        Design preview: imagery and visual studies are temporary stock references, not commissioned
        company work.
      </p>
    </footer>
  );
}
export { ArrowUpRight, ArrowRight, ArrowDown };
