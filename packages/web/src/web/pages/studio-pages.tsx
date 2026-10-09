import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import {
  Photo,
  Button,
  SectionHeading,
  ServiceGrid,
  PortfolioGrid,
  Approach,
  CTASection,
  ArrowUpRight,
  ArrowDown,
} from "../components/studio";
import { services } from "../lib/content";

export function Home() {
  return (
    <>
      <section className="home-hero">
        <Photo
          name="hero"
          alt="Temporary monochrome editorial photograph of a woman in sunglasses"
          className="hero-photo"
          eager
        />
        <div className="hero-shade" />
        <div className="hero-top eyebrow">
          <span>
            <i className="live-dot" /> A creative media studio
          </span>
          <span>Light × Rhythm × Story</span>
        </div>
        <div className="hero-main">
          <span className="hero-kicker">Where creativity finds clarity.</span>
          <h1>
            ILLUMINATING
            <br />
            <span className="hero-outline">STORIES.</span>
            <span className="hero-second">SHAPING EXPERIENCES.</span>
          </h1>
          <div className="hero-lower">
            <p>
              Lumen Pulse Media brings together visual storytellers, designers and event specialists
              to create captivating content and immersive experiences.
            </p>
            <div className="hero-buttons">
              <Button href="/contact">Start a project</Button>
              <Button href="/services" secondary>
                View our services
              </Button>
            </div>
          </div>
        </div>
        <div className="hero-bottom eyebrow">
          <span>Photography · Film · Design · Motion · Events</span>
          <a href="#introduction">
            Scroll to discover <ArrowDown size={16} />
          </a>
        </div>
      </section>
      <div className="discipline-strip" aria-hidden="true">
        VISUAL STORYTELLING <span>✳</span> DESIGN & DIGITAL <span>✳</span> MOTION & IMAGINATION{" "}
        <span>✳</span> EXPERIENCES <span>✳</span>
      </div>
      <section className="intro section" id="introduction">
        <SectionHeading number="01" label="The studio" />
        <div className="intro-layout">
          <h2>
            CREATIVITY
            <br />
            WITH <span className="serif">purpose.</span>
          </h2>
          <div>
            <p className="large-copy">
              Artistry. Precision.
              <br />A pulse of possibility.
            </p>
            <p className="muted">
              We’re a modern creative media hub, combining visual storytelling, design and
              experiences to amplify brands, ideas and human moments.
            </p>
            <p className="muted">
              From the first frame to the final experience, we bring creativity and clarity
              together.
            </p>
            <Link href="/about" className="text-link">
              Meet Lumen Pulse <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section services-home">
        <div className="section-top">
          <SectionHeading number="02" label="Our capabilities" title="WHAT WE CREATE" />
          <Link href="/services" className="text-link">
            Explore all services <ArrowUpRight size={18} />
          </Link>
        </div>
        <ServiceGrid />
      </section>
      <Approach />
      <section className="section work-home">
        <div className="section-top">
          <SectionHeading number="04" label="A visual perspective" title="SELECTED WORK" />
          <Link href="/work" className="text-link">
            Explore the visual studies <ArrowUpRight size={18} />
          </Link>
        </div>
        <p className="work-disclaimer">
          A preview of possibilities. Temporary visual studies, not commissioned client work.
        </p>
        <PortfolioGrid />
      </section>
      <section className="director-teaser section">
        <span className="eyebrow">05 / The creative perspective</span>
        <blockquote>
          “We’re here to make an impact,
          <br />
          not just <span className="serif">noise.</span>”
        </blockquote>
        <div>
          <span>
            Sifiso Mkhonza <small>Creative Director</small>
          </span>
          <Link href="/creative-director" className="text-link">
            Behind the pulse <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <CTASection />
    </>
  );
}

function PageHero({
  label,
  title,
  description,
  image,
}: {
  label: string;
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <section className={`page-hero ${image ? "with-image" : ""}`}>
      <div className="page-hero-copy">
        <span className="eyebrow">
          <span className="live-dot" /> {label}
        </span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {image && (
        <div className="page-hero-image">
          <Photo name={image} alt={`${label} temporary editorial visual`} eager />
          <span className="image-footnote">Creative visual reference / Design preview</span>
        </div>
      )}
    </section>
  );
}

export function About() {
  return (
    <>
      <PageHero
        label="About the studio"
        title="Where creativity finds clarity."
        description="A modern creative media hub. Visual storytellers, designers and event specialists, united by a shared creative pulse."
        image="light"
      />
      <section className="section about-statement">
        <SectionHeading number="01" label="Our identity" />
        <div className="intro-layout">
          <h2>
            ARTISTRY MEETS
            <br />
            <span className="serif">precision.</span>
          </h2>
          <div>
            <p className="large-copy">
              We bring light to ideas.
              <br />
              And rhythm to stories.
            </p>
            <p>
              Lumen Pulse Media combines photography, videography, animation, graphic design,
              illustration, web design and event management to deliver captivating content and
              immersive experiences.
            </p>
            <p className="muted">
              A meeting point for creativity, strategy and execution. We amplify brands, ideas and
              human moments through purposeful visual storytelling.
            </p>
          </div>
        </div>
      </section>
      <section className="philosophy section">
        <div>
          <span className="eyebrow">02 / The meaning behind the name</span>
          <h2>
            LIGHT.
            <br />
            RHYTHM.
            <br />
            <span className="serif">STORY.</span>
          </h2>
        </div>
        <div className="philosophy-definitions">
          <div>
            <span>01</span>
            <h3>
              Lumen <small>/ Light</small>
            </h3>
            <p>Light reveals what matters. It gives ideas shape and brings a story into focus.</p>
          </div>
          <div>
            <span>02</span>
            <h3>
              Pulse <small>/ Rhythm</small>
            </h3>
            <p>
              Rhythm creates connection. It brings movement, energy and a human dimension to
              creative expression.
            </p>
          </div>
          <p className="muted">Light and rhythm are at the heart of compelling stories.</p>
        </div>
      </section>
      <Approach />
      <CTASection />
    </>
  );
}

export function Services() {
  const groups = [
    {
      title: "Visual storytelling",
      subtitle: "Capture it. Bring it to life.",
      image: "fashion",
      indices: [0, 1],
    },
    {
      title: "Design",
      subtitle: "Clarity, with character.",
      image: "design",
      indices: [2],
      extra: true,
    },
    { title: "Motion", subtitle: "Give your ideas movement.", image: "motion", indices: [3] },
    { title: "Experiences", subtitle: "Make it a moment.", image: "events", indices: [4] },
  ];
  return (
    <>
      <PageHero
        label="Our capabilities"
        title="Many disciplines. One creative pulse."
        description="Visual storytelling, design, motion and experiences. Explore the creative possibilities for your next project."
      />
      <section className="directory section">
        {groups.map((g, i) => (
          <article className="directory-group" key={g.title}>
            <div className="directory-photo">
              <Photo name={g.image} alt={`${g.title} stock creative reference`} />
              <span className="image-number">0{i + 1}</span>
            </div>
            <div className="directory-copy">
              <span className="eyebrow">
                0{i + 1} / {g.subtitle}
              </span>
              <h2>{g.title}</h2>
              {g.indices.map((index) => (
                <div className="directory-service" key={index}>
                  <Link href={`/services/${services[index].slug}`}>
                    <h3>{services[index].title}</h3>
                    <ArrowUpRight />
                  </Link>
                  <p>{services[index].description}</p>
                  <div className="directory-tags">
                    {services[index].sections.map((s) => (
                      <span key={s.title}>{s.title}</span>
                    ))}
                  </div>
                </div>
              ))}
              {g.extra && (
                <div className="directory-extra">
                  <Link href="/services/design#web-ui">
                    Web & UI Design <ArrowUpRight size={16} />
                  </Link>
                  <Link href="/services/animation-illustration#illustration">
                    Illustration <ArrowUpRight size={16} />
                  </Link>
                </div>
              )}
              <Button
                href={`/contact?service=${encodeURIComponent(services[g.indices[0]].title)}`}
                secondary
              >
                Discuss a project
              </Button>
            </div>
          </article>
        ))}
      </section>
      <CTASection />
    </>
  );
}

export function ServicePage({ slug }: { slug: string }) {
  const s = services.find((s) => s.slug === slug);
  if (!s) return <NotFound />;
  const others = services.filter((o) => o.slug !== slug).slice(0, 3);
  return (
    <>
      <div className="breadcrumb">
        <Link href="/services">Services</Link>
        <span>/</span>
        <span>{s.title}</span>
      </div>
      <PageHero label={s.title} title={s.headline} description={s.intro} image={s.image} />
      <section className="section service-details">
        <div className="service-details-heading">
          <SectionHeading number="01" label="What we do" />
          <h2>
            A CREATIVE EYE.
            <br />A CLEAR <span className="serif">purpose.</span>
          </h2>
          <p>Explore our {s.title.toLowerCase()} capabilities.</p>
          <Button href={`/contact?service=${encodeURIComponent(s.title)}`}>
            Book a creative conversation
          </Button>
        </div>
        <div className="capability-list">
          {s.sections.map((section, i) => (
            <article id={"id" in section ? section.id : undefined} key={section.title}>
              <span className="small-number">0{i + 1}</span>
              <div>
                <h3>{section.title}</h3>
                <p>{section.text}</p>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section service-visuals">
        <SectionHeading
          number="02"
          label="A visual perspective"
          title={slug === "videography" ? "A FRAME OF POSSIBILITY." : "IMAGINE THE POSSIBILITIES."}
        />
        <p className="work-disclaimer">
          Temporary creative references. Approved company work will replace these design-stage
          visuals.
        </p>
        <div className="service-visual-grid">
          <Photo
            name={
              slug === "photography"
                ? "portrait"
                : slug === "design"
                  ? "illustration"
                  : slug === "events"
                    ? "video"
                    : slug === "videography"
                      ? "events"
                      : "illustration"
            }
            alt="Temporary creative reference"
          />
          <Photo
            name={slug === "photography" ? "architecture" : "light"}
            alt="Temporary editorial visual reference"
          />
        </div>
        {slug === "videography" && (
          <p className="muted">
            Video showcase area — poster references only at this design stage. No autoplay or
            unapproved footage.
          </p>
        )}
      </section>
      <section className="section related">
        <SectionHeading number="03" label="More possibilities" title="CONNECTED CAPABILITIES" />
        {others.map((o) => (
          <Link href={`/services/${o.slug}`} key={o.slug}>
            <h3>{o.title}</h3>
            <span>{o.category}</span>
            <ArrowUpRight />
          </Link>
        ))}
      </section>
      <CTASection />
    </>
  );
}

export function Work() {
  return (
    <>
      <PageHero
        label="A visual perspective"
        title="Stories take many forms."
        description="Photography, film, design and experiences. A curated exploration of the creative possibilities behind the pulse."
      />
      <section className="section work-page">
        <div className="preview-notice">
          <span className="live-dot" />
          <div>
            <strong>A portfolio in the making.</strong>
            <p>
              These are temporary stock visual studies, not completed client projects. The structure
              is ready for approved Lumen Pulse Media work.
            </p>
          </div>
        </div>
        <PortfolioGrid full />
      </section>
      <CTASection />
    </>
  );
}

export function Director() {
  return (
    <>
      <section className="director-hero">
        <div>
          <span className="eyebrow">The people behind the pulse</span>
          <h1>
            SIFISO
            <br />
            MKHONZA<span>Creative Director</span>
          </h1>
          <p>
            Creativity + strategy. Collaboration + connection.
            <br />A perspective focused on meaningful impact.
          </p>
        </div>
        <div className="director-art">
          <Photo
            name="light"
            alt="Abstract light and material study, not a portrait of the Creative Director"
            eager
          />
          <span className="eyebrow">An editorial light study / Portrait to follow</span>
          <span className="art-type" aria-hidden="true">
            LIGHT.
            <br />
            RHYTHM.
            <br />
            STORY.
          </span>
        </div>
      </section>
      <section className="section manifesto">
        <SectionHeading number="01" label="The creative perspective" />
        <blockquote>
          “WE’RE HERE TO MAKE AN IMPACT,
          <br />
          NOT JUST <span className="serif">NOISE.</span>”
        </blockquote>
        <div className="manifesto-copy">
          <p className="large-copy">
            Brands deserve more than visibility.
            <br />
            They deserve genuine connection.
          </p>
          <div>
            <p>
              Creativity and strategy work best together. Through collaboration, innovation and
              thoughtful brand communication, the focus is on creating meaningful impact.
            </p>
            <p className="muted">
              Staying ahead means remaining open to new ideas and creative possibilities. The pulse
              is a commitment to connection, not simply attention.
            </p>
          </div>
        </div>
        <div className="change-quote">
          <span className="eyebrow">A thought to take with you</span>
          <h2>
            “Nothing changes
            <br />
            if nothing <span className="serif">changes.</span>”
          </h2>
        </div>
      </section>
      <CTASection />
    </>
  );
}

export function Contact() {
  const initial = new URLSearchParams(window.location.search).get("service") || "";
  const [prepared, setPrepared] = useState(false);
  const [draft, setDraft] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = `Name: ${d.get("name")}\nEmail: ${d.get("email")}\nPhone: ${d.get("phone") || "Not provided"}\nCompany / Organisation: ${d.get("company") || "Not provided"}\nService: ${d.get("service")}\n\nProject details:\n${d.get("details")}`;
    const url = `mailto:hello@lumenpulse.co.za?subject=${encodeURIComponent("Project enquiry — " + d.get("service"))}&body=${encodeURIComponent(body)}`;
    setDraft(url);
    setPrepared(true);
    window.location.href = url;
  }
  return (
    <>
      <PageHero
        label="Start a conversation"
        title="Let’s create something extraordinary."
        description="Tell us about your next idea, campaign, event or creative project."
      />
      <section className="section contact-section">
        <div className="contact-info">
          <span className="eyebrow">Say hello</span>
          <h2>
            GOOD THINGS
            <br />
            START WITH A<br />
            <span className="serif">conversation.</span>
          </h2>
          <a href="mailto:hello@lumenpulse.co.za" className="contact-link">
            hello@lumenpulse.co.za
            <ArrowUpRight size={20} />
          </a>
          <a href="tel:+27711435683" className="contact-link">
            0711435683
            <ArrowUpRight size={20} />
          </a>
          <a href="https://www.lumenpulse.co.za" className="contact-link">
            www.lumenpulse.co.za
            <ArrowUpRight size={20} />
          </a>
          <Photo name="motion" alt="Folded paper creative reference" />
          <span className="eyebrow image-footnote-static">Light × Rhythm × Story</span>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <span className="eyebrow">Your project / Your possibilities</span>
          <div className="form-row">
            <label>
              Name <span>*</span>
              <input
                name="name" aria-label="Name"
                autoComplete="name"
                required
                placeholder="Your name"
                maxLength={150}
              />
            </label>
            <label>
              Email <span>*</span>
              <input
                name="email" aria-label="Email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
                maxLength={254}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Phone
              <input
                name="phone" aria-label="Phone"
                type="tel"
                autoComplete="tel"
                placeholder="Your contact number"
                maxLength={50}
              />
            </label>
            <label>
              Company / Organisation
              <input
                name="company" aria-label="Company / Organisation"
                autoComplete="organization"
                placeholder="Company name"
                maxLength={150}
              />
            </label>
          </div>
          <label>
            What can we help you with? <span>*</span>
            <select name="service" required defaultValue={initial}>
              <option value="" disabled>
                Select a service
              </option>
              {[
                "Photography",
                "Videography",
                "Graphic Design",
                "Animation & Illustration",
                "Web & UI Design",
                "Events",
                "DJ Services",
                "Multiple services",
                "Something else",
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            Project details <span>*</span>
            <textarea
              name="details" aria-label="Project details"
              required
              rows={6}
              placeholder="The idea, the vision, the occasion. Tell us a little about what you have in mind."
              maxLength={4000}
            />
          </label>
          <p className="form-note">
            This form opens a prefilled email in your email app. Nothing is sent until you send it
            there. We don’t store your details on this website.
          </p>
          <button className="button" type="submit">
            Send enquiry <ArrowUpRight size={18} />
          </button>
          {prepared && (
            <output className="form-status">
              <strong>Your email draft is ready — not sent.</strong>
              <p>
                Review and send it in your email app. If it didn’t open,{" "}
                <a href={draft}>open the draft again</a> or email hello@lumenpulse.co.za directly.
              </p>
            </output>
          )}
        </form>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <section className="section not-found">
      <span className="eyebrow">404 / A different direction</span>
      <h1>
        Let’s get you
        <br />
        back on track.
      </h1>
      <Button href="/">Back to the studio</Button>
    </section>
  );
}
