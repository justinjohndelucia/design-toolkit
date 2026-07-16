import { useMemo, useState } from 'react';
import { QUOTES } from '../data/quotes';
import './GreetingStrip.css';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return 'Still up';
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function getDateStr(): string {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function GreetingStrip() {
  const [quoteIdx, setQuoteIdx] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const dateStr = useMemo(getDateStr, []);
  const greeting = useMemo(getGreeting, []);

  return (
    <section className="dos-greeting">
      <div className="dos-greeting__date">{dateStr}</div>
      <h1 className="dos-greeting__headline">
        {greeting}, Justin<span className="dos-greeting__dot">.</span>
      </h1>
      <button
        type="button"
        className="dos-greeting__quote-btn"
        onClick={() => setQuoteIdx((i) => (i + 1) % QUOTES.length)}
      >
        <span className="dos-greeting__quote-bar" />
        <span className="dos-greeting__quote-text">{QUOTES[quoteIdx]}</span>
      </button>
    </section>
  );
}
