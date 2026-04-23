export const ASPECT_RATIOS = {
  youtube: { width: 1280, height: 720, label: "YouTube (16:9)" },
  instagram: { width: 1080, height: 1080, label: "Instagram (1:1)" },
  story: { width: 1080, height: 1920, label: "Story (9:16)" },
  twitter: { width: 1500, height: 500, label: "Twitter/X Banner" },
};

export function generateImage(prompt, width, height) {
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true&enhance=true`;
}
