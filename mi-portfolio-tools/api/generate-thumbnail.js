export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, styleKeywords, aspectRatio } = req.body;

  if (!prompt || prompt.trim().length === 0) {
    return res.status(400).json({ error: "El prompt no puede estar vacio" });
  }

  const ASPECT_RATIOS = {
    youtube: { width: 1280, height: 720 },
    instagram: { width: 1080, height: 1080 },
    story: { width: 1080, height: 1920 },
    twitter: { width: 1500, height: 500 },
  };
  const ratio = ASPECT_RATIOS[aspectRatio] ?? ASPECT_RATIOS.youtube;

  try {
    const groqApiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
    let enhancedPrompt = prompt.trim();

    if (groqApiKey) {
      const groqResponse = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            max_tokens: 200,
            temperature: 0.7,
            messages: [
              {
                role: "system",
                content: `You are a specialist in writing image generation prompts
specifically optimized for YouTube thumbnails and social media banners.

Your job is to transform a simple user description into a structured,
realistic image generation prompt that produces clear, high-impact thumbnails.

STRICT RULES:
- Respect the user's literal intent. Never replace or invent key elements.
- If the user says "person screaming", keep a real person screaming.
- If the user says "phone background", keep a phone or screen in the scene.
- Prioritize photorealistic style unless the user explicitly asks otherwise.
- Never add surreal, fantasy or abstract elements unless requested.
- No metaphors. Describe exactly what should appear in the image.
- Keep the prompt visually simple and readable at small thumbnail size.
- Avoid extra characters or objects unless they are explicitly requested.
- If the user describes an interface element like phone, laptop, screen, or app, keep it clearly recognizable.

STRUCTURE to follow (in this order):
1. Main subject: who or what is the clear focus (large, centered or rule-of-thirds)
2. Action or expression: what are they doing or feeling (be specific)
3. Background: simple, clean, high contrast with subject
4. Lighting: dramatic, studio-quality or cinematic - always flattering
5. Camera framing: close-up, medium shot, or wide - pick what fits best
6. Thumbnail style keywords: bold colors, sharp focus, high contrast,
   face clearly visible if person, no text in image

OUTPUT FORMAT:
- Plain English, one paragraph, no bullet points
- Max 120 words
- End with: photorealistic, 8k, sharp focus, thumbnail composition,
  high contrast, professional photography`,
              },
              {
                role: "user",
                content: `Transform this into an image prompt:
"${prompt.trim()}"
Style context: ${styleKeywords || "cinematic, professional"}`,
              },
            ],
          }),
        }
      );

      if (groqResponse.ok) {
        const groqData = await groqResponse.json();
        const raw = groqData.choices[0].message.content.trim();
        enhancedPrompt = raw.replace(/^["']|["']$/g, "").slice(0, 500);
      }
    }

    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    const pollinationsUrl =
      `https://image.pollinations.ai/prompt/${encodedPrompt}` +
      `?width=${ratio.width}&height=${ratio.height}` +
      "&nologo=true&enhance=false&model=flux";

    let imageBuffer = null;
    let contentType = null;
    const MAX_RETRIES = 3;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 55000);

        const imgResponse = await fetch(pollinationsUrl, {
          signal: controller.signal,
        });
        clearTimeout(timeout);

        const respContentType = imgResponse.headers.get("content-type") || "";

        if (imgResponse.ok && respContentType.startsWith("image/")) {
          imageBuffer = Buffer.from(await imgResponse.arrayBuffer());
          contentType = respContentType;
          break;
        }

        if (attempt < MAX_RETRIES) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
        }
      } catch (fetchError) {
        if (attempt === MAX_RETRIES) {
          throw fetchError;
        }

        await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
      }
    }

    if (!imageBuffer) {
      return res.status(502).json({
        error: "No se pudo generar la imagen. Intenta de nuevo.",
      });
    }

    const base64Image = imageBuffer.toString("base64");
    return res.status(200).json({
      success: true,
      enhancedPrompt,
      imageData: base64Image,
      contentType,
    });
  } catch (error) {
    console.error("Error en generate-thumbnail:", error);
    return res.status(500).json({
      error: "Error interno. Intenta de nuevo en unos segundos.",
    });
  }
}
