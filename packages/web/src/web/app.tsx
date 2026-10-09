import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import {
  Home,
  About,
  Services,
  ServicePage,
  Work,
  Director,
  Contact,
  NotFound,
} from "./pages/studio-pages";
import { Navbar, Footer } from "./components/studio";
import { services } from "./lib/content";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function PageMetadata() {
  const [path] = useLocation();
  useEffect(() => {
    const service = services.find((s) => path === `/services/${s.slug}`);
    const names: Record<string, string> = {
      "/": "Creative Media, Design & Events",
      "/about": "About the Creative Studio",
      "/services": "Photography, Film, Design & Event Services",
      "/work": "Creative Visual Studies",
      "/creative-director": "Sifiso Mkhonza | Creative Director",
      "/contact": "Start a Project",
    };
    document.title = `${service ? `${service.title} Services` : names[path] || "Page not found"} | Lumen Pulse Media`;
    if (path === "/") document.title = "Lumen Pulse Media | Creative Media, Design & Events";
    const desc =
      service?.intro ||
      (
        {
          "/about":
            "Lumen Pulse Media brings together visual storytellers, designers and event specialists. Where creativity finds clarity.",
          "/work":
            "Explore temporary creative visual studies across photography, video, graphic design, motion and experiences.",
          "/contact":
            "Discuss your photography, film, design or event project with Lumen Pulse Media. Call 0711435683 or email hello@lumenpulse.co.za.",
        } as Record<string, string>
      )[path] ||
      "Lumen Pulse Media combines artistry with precision across photography, videography, graphic design, animation, illustration, web design and events.";
    for (const [key, value] of [
      ["description", desc],
      ["og:title", document.title],
      ["og:description", desc],
    ]) {
      const attribute = key.startsWith("og:") ? "property" : "name";
      let el = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attribute, key);
        document.head.append(el);
      }
      el.content = value;
    }
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = "https://www.lumenpulse.co.za" + path;
    window.scrollTo(0, 0);
    if (window.location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView(),
      );
    }
  }, [path]);
  return null;
}
function App() {
  return (
    <Provider>
      <PageMetadata />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/services/:slug">{(params) => <ServicePage slug={params.slug} />}</Route>
          <Route path="/work" component={Work} />
          <Route path="/creative-director" component={Director} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
