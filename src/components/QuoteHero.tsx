import { useState } from 'react';
import { Bookmark, BookmarkCheck, Shuffle } from 'lucide-react';
import { QUOTES } from '../data/quotes';
import './QuoteHero.css';

function randomIndex(exclude?: number): number {
  if (QUOTES.length <= 1) return 0;
  let i = Math.floor(Math.random() * QUOTES.length);
  while (i === exclude) {
    i = Math.floor(Math.random() * QUOTES.length);
  }
  return i;
}

interface QuoteHeroProps {
  saved: Record<string, boolean>;
  onToggleSave: (id: string) => void;
}

export function QuoteHero({ saved, onToggleSave }: QuoteHeroProps) {
  const [quoteIdx, setQuoteIdx] = useState(() => randomIndex());
  const quote = QUOTES[quoteIdx];
  const isSaved = !!saved[quote.id];

  return (
    <section className="dos-quote-hero">
      <div className="dos-quote-hero__row">
        <span className="dos-quote-hero__bar" />
        <div className="dos-quote-hero__body">
          <p className="dos-quote-hero__text">&ldquo;{quote.text}&rdquo;</p>
          <p className="dos-quote-hero__author">— {quote.author}</p>
        </div>
      </div>
      <div className="dos-quote-hero__actions">
        <button
          type="button"
          className="dos-quote-hero__btn"
          onClick={() => setQuoteIdx((i) => randomIndex(i))}
        >
          <Shuffle size={14} />
          Another quote
        </button>
        <button
          type="button"
          className={`dos-quote-hero__btn${isSaved ? ' dos-quote-hero__btn--active' : ''}`}
          onClick={() => onToggleSave(quote.id)}
        >
          {isSaved ? <BookmarkCheck size={14} fill="currentColor" /> : <Bookmark size={14} />}
          {isSaved ? 'Saved' : 'Save quote'}
        </button>
      </div>
    </section>
  );
}
