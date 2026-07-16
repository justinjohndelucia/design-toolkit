import { useMemo, useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { ARTICLES, CATEGORIES } from '../data/articles';
import { PAL } from '../data/palette';
import { CategoryChips } from './CategoryChips';
import { NewsCard } from './NewsCard';
import './NewsSection.css';

const INITIAL_LIMIT = 7;
const LOAD_MORE_STEP = 6;

interface NewsSectionProps {
  saved: Record<string, boolean>;
  onToggleSave: (id: string) => void;
}

export function NewsSection({ saved, onToggleSave }: NewsSectionProps) {
  const [category, setCategory] = useState('All');
  const [savedOnly, setSavedOnly] = useState(false);
  const [limit, setLimit] = useState(INITIAL_LIMIT);

  const savedCount = Object.keys(saved).length;

  const filtered = useMemo(() => {
    let list = ARTICLES;
    if (savedOnly) list = list.filter((a) => saved[a.id]);
    if (category !== 'All') list = list.filter((a) => a.category === category);
    return list;
  }, [category, savedOnly, saved]);

  const shown = filtered.slice(0, limit);
  const hasMore = shown.length < filtered.length;

  function selectCategory(name: string) {
    setCategory(name);
    setSavedOnly(false);
    setLimit(INITIAL_LIMIT);
  }

  function toggleSavedOnly() {
    setSavedOnly((prev) => !prev);
    setCategory('All');
    setLimit(INITIAL_LIMIT);
  }

  return (
    <section id="news" className="dos-news">
      <div className="dos-news__header">
        <div>
          <div className="dos-news__title-row">
            <span className="dos-news__dot" />
            <h2 className="dos-news__title">Industry News</h2>
          </div>
          <p className="dos-news__subtitle">Curated for design leaders — refreshed from your feeds.</p>
        </div>
        <button
          type="button"
          className={`dos-news__saved-btn${savedOnly ? ' dos-news__saved-btn--active' : ''}`}
          onClick={toggleSavedOnly}
        >
          {savedOnly ? <BookmarkCheck size={15} fill="currentColor" /> : <Bookmark size={15} />}
          {savedOnly ? 'Saved' : `Saved${savedCount ? ` · ${savedCount}` : ''}`}
        </button>
      </div>

      <CategoryChips categories={CATEGORIES} active={category} onSelect={selectCategory} />

      {shown.length > 0 ? (
        <div className="dos-news__grid">
          {shown.map((article, i) => {
            const featured = i === 0 && !savedOnly && category === 'All';
            const wide = i === 3 && !savedOnly && category === 'All';
            return (
              <NewsCard
                key={article.id}
                article={article}
                gradient={PAL[i % PAL.length]}
                featured={featured}
                wide={wide}
                saved={!!saved[article.id]}
                delay={i * 0.05}
                onToggleSave={() => onToggleSave(article.id)}
              />
            );
          })}
        </div>
      ) : (
        <div className="dos-news__empty">
          <div className="dos-news__empty-title">Nothing here yet</div>
          <div className="dos-news__empty-body">
            {savedOnly ? 'Bookmark a story and it will appear here.' : 'No stories in this category yet.'}
          </div>
        </div>
      )}

      {hasMore && (
        <div className="dos-news__more">
          <button
            type="button"
            className="dos-news__more-btn"
            onClick={() => setLimit((l) => l + LOAD_MORE_STEP)}
          >
            Load more stories
          </button>
        </div>
      )}
    </section>
  );
}
