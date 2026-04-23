import { useMemo, useState } from "react";
import DonationBanner from "../../components/layout/DonationBanner";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import useImageGeneration from "../../hooks/useImageGeneration";
import { ASPECT_RATIOS } from "../../services/api";

const quickPrompts = [
  "Gaming épico",
  "Tutorial tech",
  "Vlog viaje",
  "Fitness motivacional",
  "Cocina colorida",
];

const styleOptions = [
  {
    id: "cinematic",
    label: "Cinematográfico",
    keywords: "cinematic lighting, dramatic, film grain",
  },
  {
    id: "minimalist",
    label: "Minimalista",
    keywords: "minimalist, clean, white space, modern",
  },
  {
    id: "neon",
    label: "Neón/Cyberpunk",
    keywords: "neon lights, cyberpunk, futuristic city",
  },
  {
    id: "anime",
    label: "Anime",
    keywords: "anime style, manga, vibrant colors, japanese art",
  },
  {
    id: "professional",
    label: "Profesional/Corporativo",
    keywords: "corporate, professional, business, clean",
  },
  {
    id: "watercolor",
    label: "Acuarela",
    keywords: "watercolor, artistic, painted, soft colors",
  },
];

function ThumbnailGenerator() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(styleOptions[0].id);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("youtube");
  const [isDownloading, setIsDownloading] = useState(false);

  const { imageUrl, isLoading, error, hasGenerated, generateImage, resetGeneration } =
    useImageGeneration();

  const activeStyle = useMemo(
    () => styleOptions.find((style) => style.id === selectedStyle),
    [selectedStyle]
  );

  const handleGenerate = async () => {
    await generateImage(prompt, selectedAspectRatio, activeStyle?.keywords ?? "");
  };

  const handleQuickPrompt = (value) => {
    const nextValue = value.slice(0, 300);
    setPrompt(nextValue);
  };

  const handleReset = () => {
    setPrompt("");
    resetGeneration();
  };

  const handleDownload = async () => {
    if (!imageUrl) {
      return;
    }

    try {
      setIsDownloading(true);
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("No se pudo descargar la imagen.");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `miniatura-${selectedAspectRatio}.jpg`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (downloadError) {
      console.error(downloadError);
      alert("No se pudo descargar la imagen. Intenta nuevamente.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Generador de Miniaturas/Banners con IA
        </h1>
        <p className="mt-2 max-w-3xl text-gray-300">
          Escribe una idea, elige estilo y formato, y genera una imagen lista para publicar.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-card p-5 sm:p-6">
          <div>
            <label htmlFor="prompt" className="mb-2 block text-sm font-semibold text-white">
              Describe tu miniatura
            </label>
            <textarea
              id="prompt"
              value={prompt}
              maxLength={300}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Describe tu miniatura... ej: 'Hombre sorprendido con computadora en fondo de ciudad futurista de noche'"
              className="min-h-36 w-full rounded-xl border border-white/15 bg-dark p-3 text-sm text-white outline-none transition focus:border-primary"
            />
            <p className="mt-2 text-right text-xs text-gray-400">{prompt.length}/300</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {quickPrompts.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-gray-200 transition hover:border-primary hover:text-white"
                  onClick={() => handleQuickPrompt(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-3 text-sm font-semibold text-white">Estilo visual</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {styleOptions.map((style) => {
                const isActive = style.id === selectedStyle;
                return (
                  <button
                    key={style.id}
                    type="button"
                    className={`rounded-xl border px-3 py-2 text-sm transition ${
                      isActive
                        ? "border-primary bg-primary/20 text-white"
                        : "border-white/15 text-gray-300 hover:border-primary/50 hover:text-white"
                    }`}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    {style.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-3 text-sm font-semibold text-white">Formato</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {Object.entries(ASPECT_RATIOS).map(([key, ratio]) => {
                const isActive = key === selectedAspectRatio;
                return (
                  <button
                    key={key}
                    type="button"
                    className={`rounded-xl border px-3 py-2 text-sm transition ${
                      isActive
                        ? "border-primary bg-primary/20 text-white"
                        : "border-white/15 text-gray-300 hover:border-primary/50 hover:text-white"
                    }`}
                    onClick={() => setSelectedAspectRatio(key)}
                  >
                    {ratio.label}
                  </button>
                );
              })}
            </div>
          </div>

          {error ? <p className="mt-5 text-sm text-secondary">{error}</p> : null}

          <div className="mt-6">
            <Button variant="primary" fullWidth loading={isLoading} onClick={handleGenerate}>
              {isLoading ? "Generando..." : "✨ Generar Imagen"}
            </Button>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-card p-5 sm:p-6">
          <h2 className="mb-4 text-sm font-semibold text-white">Vista previa</h2>
          {!imageUrl && !isLoading && (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-dark/80 p-6 text-center text-gray-400">
              <span className="text-5xl">🖼️</span>
              <p className="mt-3 text-sm">Tu imagen aparecerá aquí</p>
            </div>
          )}

          {isLoading && (
            <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-white/10 bg-dark/80">
              <Loader />
            </div>
          )}

          {imageUrl && !isLoading && (
            <div className="space-y-4">
              <img
                src={imageUrl}
                alt="Miniatura generada con IA"
                className="w-full rounded-xl border border-white/10 shadow-glow"
              />
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" loading={isDownloading} onClick={handleDownload}>
                  ⬇️ Descargar
                </Button>
                <Button variant="ghost" onClick={handleReset}>
                  🔄 Nueva imagen
                </Button>
              </div>
            </div>
          )}
        </article>
      </section>

      <DonationBanner show={hasGenerated} />
    </div>
  );
}

export default ThumbnailGenerator;
