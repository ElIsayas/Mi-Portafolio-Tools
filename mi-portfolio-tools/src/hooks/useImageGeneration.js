import { useState } from "react";
import { generateThumbnail } from "../services/api";

function useImageGeneration() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [enhancedPrompt, setEnhancedPrompt] = useState("");

  const generateImage = async (prompt, aspectRatio, styleKeywords) => {
    if (!prompt.trim()) {
      setError("Por favor escribe una descripcion para generar la imagen.");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      setEnhancedPrompt("");
      setImageUrl("");

      const result = await generateThumbnail(
        prompt.trim(),
        styleKeywords,
        aspectRatio
      );

      setEnhancedPrompt(result.enhancedPrompt);
      setImageUrl(result.imageUrl);
      setHasGenerated(true);
    } catch (err) {
      setError(err.message || "No se pudo generar la imagen. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetGeneration = () => {
    setImageUrl("");
    setError("");
    setHasGenerated(false);
    setIsLoading(false);
    setEnhancedPrompt("");
  };

  return {
    imageUrl,
    isLoading,
    error,
    hasGenerated,
    enhancedPrompt,
    generateImage,
    resetGeneration,
  };
}

export default useImageGeneration;
