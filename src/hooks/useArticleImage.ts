import { useEffect, useState } from 'react';
import type { Article } from '../types';
import { resolveArticleImage } from '../lib/images';

/** Resolves an article's image (real thumbnail → cache → Unsplash → deterministic fallback). */
export function useArticleImage(article: Article) {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setSrc(null);
    setFailed(false);
    resolveArticleImage(article).then((url) => {
      if (!cancelled) setSrc(url);
    });
    return () => {
      cancelled = true;
    };
  }, [article]);

  return { src: failed ? null : src, onError: () => setFailed(true) };
}
