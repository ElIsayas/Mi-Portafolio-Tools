import { useEffect, useState } from "react";

const SESSION_KEY = "donation-banner-dismissed";

function DonationBanner({ show }) {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const storedValue = sessionStorage.getItem(SESSION_KEY);
    setIsDismissed(storedValue === "true");
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setIsDismissed(true);
  };

  if (!show || isDismissed) {
    return null;
  }

  return (
    <aside className="fixed bottom-5 right-4 z-50 w-[calc(100%-2rem)] max-w-sm animate-slide-in-up rounded-xl border border-white/15 bg-card p-4 shadow-glow sm:right-6">
      <button
        type="button"
        className="absolute right-3 top-3 rounded-md px-2 text-gray-400 transition hover:text-white"
        onClick={handleClose}
        aria-label="Cerrar banner"
      >
        X
      </button>
      <p className="pr-8 text-sm text-gray-100">¿Te fue útil? ¡Invítame un café! ☕</p>
      <a
        href="https://buymeacoffee.com"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
      >
        Ir a donar
      </a>
    </aside>
  );
}

export default DonationBanner;
