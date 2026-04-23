import { useState } from "react";
import { ASPECT_RATIOS, generateImage as generateImageUrl } from "../services/api";

function useImageGeneration() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImageReady, setIsImageReady] = useState(false);
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
      setIsImageReady(false);

      const finalPrompt = [
        cleanedPrompt,
        styleKeywords,
        "high quality, 4k, professional, thumbnail style",
      ]
        .filter(Boolean)
        .join(", ");

      const url = generateImageUrl(finalPrompt, ratio.width, ratio.height);
      setImageUrl(url);
    } catch (requestError) {
      setError("No se pudo generar la imagen. Intenta de nuevo.");
      setIsLoading(false);
      console.error(requestError);
    }
  };

  const onImageLoad = () => {
    setIsLoading(false);
    setIsImageReady(true);
    setHasGenerated(true);
  };

  const onImageError = () => {
    setIsLoading(false);
    setIsImageReady(false);
    setError("No se pudo cargar la imagen. Intenta de nuevo.");
  };

  const resetGeneration = () => {
    setImageUrl("");
    setError("");
    setHasGenerated(false);
    setIsLoading(false);
    setIsImageReady(false);
  };

  return {
    imageUrl,
    isLoading,
    isImageReady,
    error,
    hasGenerated,
    generateImage,
    onImageLoad,
    onImageError,
    resetGeneration,
  };
}

export default useImageGeneration;
