import { useState } from "react";
import { ASPECT_RATIOS, generateImage as generateImageUrl } from "../services/api";

function useImageGeneration() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateImage = async (prompt, aspectRatio, styleKeywords) => {
    const cleanedPrompt = prompt.trim();

    if (!cleanedPrompt) {
      setError("Por favor escribe una descripción para generar la imagen.");
      return;
    }

    const ratio = ASPECT_RATIOS[aspectRatio] ?? ASPECT_RATIOS.youtube;

    try {
      setError("");
      setIsLoading(true);

      const finalPrompt = [
        cleanedPrompt,
        styleKeywords,
        "high quality, 4k, professional, thumbnail style",
      ]
        .filter(Boolean)
        .join(", ");

      // Pequeña espera para que el usuario perciba el estado de carga.
      await new Promise((resolve) => {
        setTimeout(resolve, 400);
      });

      const url = generateImageUrl(finalPrompt, ratio.width, ratio.height);
      setImageUrl(url);
      setHasGenerated(true);
    } catch (requestError) {
      setError("No se pudo generar la imagen. Intenta de nuevo en unos segundos.");
      console.error(requestError);
    } finally {
      setIsLoading(false);
    }
  };

  const resetGeneration = () => {
    setImageUrl("");
    setError("");
    setHasGenerated(false);
    setIsLoading(false);
  };

  return {
    imageUrl,
    isLoading,
    error,
    hasGenerated,
    generateImage,
    resetGeneration,
  };
}

export default useImageGeneration;
