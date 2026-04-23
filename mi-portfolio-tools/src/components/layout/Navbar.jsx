import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `transition-colors ${
    isActive ? "text-primary" : "text-gray-300 hover:text-white"
  }`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-dark/85 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          Tool<span className="text-primary">Kit</span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-white/20 p-2 text-white md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Abrir menú"
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/tools/thumbnail-generator" className={navLinkClass}>
            Herramientas
          </NavLink>
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            ☕ Donar
          </a>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-card px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3">
            <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>
              Inicio
            </NavLink>
            <NavLink
              to="/tools/thumbnail-generator"
              className={navLinkClass}
              onClick={closeMenu}
            >
              Herramientas
            </NavLink>
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex w-fit rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
              onClick={closeMenu}
            >
              ☕ Donar
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
