const FALLBACK_IMAGE = "https://placehold.co/800x600?text=No+Image";

export function getFallbackImage() {
  return FALLBACK_IMAGE;
}

export function normalizeImageUrl(rawUrl) {
  const value = String(rawUrl || "").trim();
  if (!value) return "";

  try {
    const url = new URL(value);

    // Google image search links are not direct images; extract `imgurl` when available.
    if (url.hostname.includes("google.") && url.pathname === "/imgres") {
      const nested = url.searchParams.get("imgurl");
      if (nested) return nested;
    }

    if (!["http:", "https:"].includes(url.protocol)) return "";
    return url.toString();
  } catch {
    return "";
  }
}

export function isLikelyImageUrl(url) {
  const normalized = normalizeImageUrl(url);
  if (!normalized) return false;

  const lower = normalized.toLowerCase();
  return (
    /\.(jpg|jpeg|png|webp|gif|avif)(\?.*)?$/.test(lower) ||
    lower.includes("cloudinary.com") ||
    lower.includes("amazonaws.com") ||
    lower.includes("unsplash.com") ||
    lower.includes("picsum.photos") ||
    lower.includes("googleusercontent.com")
  );
}

export function withImageFallback(event) {
  const target = event.currentTarget;
  if (target.dataset.fallbackApplied === "1") return;
  target.dataset.fallbackApplied = "1";
  target.src = FALLBACK_IMAGE;
}
