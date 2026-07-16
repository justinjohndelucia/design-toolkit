import { Bookmark, BookmarkCheck } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Article } from '../types';
import './NewsCard.css';

interface NewsCardProps {
  article: Article;
  gradient: string;
  featured: boolean;
  wide: boolean;
  saved: boolean;
  delay: number;
  onToggleSave: () => void;
}

export function NewsCard({ article, gradient, featured, wide, saved, delay, onToggleSave }: NewsCardProps) {
  const classNames = [
    'dos-news-card',
    featured && 'dos-news-card--featured',
    !featured && wide && 'dos-news-card--wide',
  ]
    .filter(Boolean)
    .join(' ');

  const style: CSSProperties & { '--pal'?: string } = {
    animationDelay: `${delay}s`,
    '--pal': gradient,
  };

  const thumbStyle: CSSProperties = article.thumbnail
    ? { backgroundImage: `url(${article.thumbnail})` }
    : {};

  return (
    <article className={classNames} style={style}>
      <div className="dos-news-card__thumb" style={thumbStyle}>
        <span className="dos-news-card__category">{article.category}</span>
        <button
          type="button"
          aria-label="Save article"
          className="dos-news-card__save"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
        >
          {saved ? <BookmarkCheck size={15} fill="currentColor" /> : <Bookmark size={15} />}
        </button>
      </div>
      <div className="dos-news-card__body">
        <h3 className="dos-news-card__headline">{article.headline}</h3>
        <p className="dos-news-card__summary">{article.summary}</p>
        <div className="dos-news-card__meta">
          <span className="dos-news-card__source">{article.source}</span>
          <span className="dos-news-card__dot" />
          <span>{article.time}</span>
        </div>
      </div>
    </article>
  );
}
