import type { Article } from '../types';

/** Search terms tuned per category for more relevant Unsplash results than the raw label. */
const CATEGORY_SEARCH_TERMS: Record<string, string> = {
  Figma: 'user interface design workspace',
  'AI for Design': 'artificial intelligence design abstract',
  'AI for Product': 'machine learning technology abstract',
  UX: 'user experience research whiteboard',
  UI: 'interface design screen',
  Branding: 'brand identity design',
  'Design Systems': 'design system grid components',
  'Product Design': 'product design sketch',
  'Product Strategy': 'strategy planning whiteboard',
  'Design Leadership': 'design team meeting',
  'Engineering Leadership': 'software engineering team',
  'Technology Management': 'technology office team',
  'Leadership & Management': 'leadership meeting office',
};

const CACHE_KEY = 'dos_image_cache_v1';

interface CacheEntry {
  url: string;
}

function readCache(): Record<string, CacheEntry> {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeCacheEntry(id: string, entry: CacheEntry) {
  try {
    const cache = readCache();
    cache[id] = entry;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // ignore write failures (e.g. private browsing, quota)
  }
}

/** Deterministic photo so a given article always gets the same fallback image. */
function deterministicFallback(id: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(id)}/600/400`;
}

function getUnsplashKey(): string | undefined {
  return import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string | undefined;
}

/**
 * Resolves the best available image for an article:
 * 1. A real thumbnail from the article data itself (e.g. an RSS feed's media/enclosure).
 * 2. A cached previous resolution (avoids re-hitting the Unsplash rate limit).
 * 3. An Unsplash search result matched to the article's category, if an API key is configured.
 * 4. A deterministic Lorem Picsum photo, seeded by article id, as a keyless fallback.
 * Callers should still keep a CSS gradient behind the <img> and fall back to it on load error.
 */
export async function resolveArticleImage(article: Article): Promise<string> {
  if (article.thumbnail) return article.thumbnail;

  const cached = readCache()[article.id];
  if (cached) return cached.url;

  const key = getUnsplashKey();
  if (key) {
    try {
      const query = CATEGORY_SEARCH_TERMS[article.category] ?? article.category;
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${key}` } },
      );
      if (res.ok) {
        const data = await res.json();
        const url: string | undefined = data?.results?.[0]?.urls?.regular;
        if (url) {
          writeCacheEntry(article.id, { url });
          return url;
        }
      }
    } catch {
      // network error — fall through to the keyless fallback below
    }
  }

  const fallback = deterministicFallback(article.id);
  writeCacheEntry(article.id, { url: fallback });
  return fallback;
}
