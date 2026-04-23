import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

function Home() {
  const handleScrollToTools = () => {
    const section = document.getElementById("tools-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <section className="rounded-3xl border border-white/10 bg-card/60 p-8 sm:p-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Portafolio de Herramientas IA
        </p>
        <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
          Herramientas Gratuitas con IA
        </h1>
        <p className="mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">
          Sin registros. Sin límites. Solo úsalas.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button onClick={handleScrollToTools}>Ver herramientas</Button>
          <Link to="/tools/thumbnail-generator">
            <Button variant="ghost">Ir al generador</Button>
          </Link>
        </div>
      </section>

      <section id="tools-section" className="mt-16">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Herramientas</h2>
          <p className="mt-2 text-gray-300">
            Empezamos con una herramienta para generar miniaturas y banners en segundos.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            title="Generador de Miniaturas"
            description="Crea miniaturas para YouTube, banners para Instagram y más con IA en segundos"
            icon="🎨"
            to="/tools/thumbnail-generator"
          />
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-primary/40 bg-primary/15 p-8 sm:p-10">
        <h3 className="font-display text-2xl font-semibold text-white">¿Te gusta este proyecto?</h3>
        <p className="mt-3 max-w-2xl text-gray-200">
          Tu apoyo ayuda a mantener estas herramientas gratuitas y a publicar nuevas utilidades cada mes.
        </p>
        <a
          href="https://buymeacoffee.com"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary/90"
        >
          Apoyar en Buy Me a Coffee
        </a>
      </section>
    </div>
  );
}

export default Home;
