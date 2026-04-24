export const ASPECT_RATIOS = {
  youtube: { width: 1280, height: 720, label: "YouTube (16:9)" },
  instagram: { width: 1080, height: 1080, label: "Instagram (1:1)" },
  story: { width: 1080, height: 1920, label: "Story (9:16)" },
  twitter: { width: 1500, height: 500, label: "Twitter/X Banner" },
};

export async function generateThumbnail(prompt, styleKeywords, aspectRatio) {
  const response = await fetch("/api/generate-thumbnail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, styleKeywords, aspectRatio }),
  });

  const rawBody = await response.text();
  let data = {};

  if (rawBody) {
    try {
      data = JSON.parse(rawBody);
    } catch {
      throw new Error(
        response.ok
          ? "La API devolvio una respuesta invalida."
          : "La API local no respondio con JSON valido."
      );
    }
  }

  if (!response.ok) {
    throw new Error(
      data.error || "Error al generar la imagen. Verifica que la API local este disponible."
    );
  }

  return {
    enhancedPrompt: data.enhancedPrompt,
    imageUrl: `data:${data.contentType};base64,${data.imageData}`,
  };
}
