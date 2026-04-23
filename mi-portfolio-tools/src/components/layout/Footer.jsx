function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-card/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-gray-300 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Hecho con ❤️ y mucho café — Todas las herramientas son 100% gratuitas</p>
        <div className="flex items-center gap-4">
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noreferrer"
            className="text-primary transition hover:text-primary/80"
          >
            Invítame un café
          </a>
          <span className="text-gray-400">© {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
