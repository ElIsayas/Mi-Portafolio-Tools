import { Link } from "react-router-dom";
import Button from "./Button";

function Card({ title, description, icon, to }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-card p-6 transition hover:-translate-y-1 hover:shadow-glow">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-300">{description}</p>
      <Link to={to} className="mt-5 inline-flex">
        <Button variant="primary">Usar herramienta</Button>
      </Link>
    </article>
  );
}

export default Card;
