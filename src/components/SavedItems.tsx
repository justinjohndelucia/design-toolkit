import { useMemo, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { QUOTES } from '../data/quotes';
import { ARTICLES } from '../data/articles';
import { TOOLS } from '../data/tools';
import './SavedItems.css';

type SavedEntry =
  | { kind: 'quote'; id: string; title: string; subtitle: string; body: string }
  | { kind: 'article'; id: string; title: string; subtitle: string; body: string }
  | { kind: 'tool'; id: string; title: string; subtitle: string; body: string; url: string };

const KIND_LABEL: Record<SavedEntry['kind'], string> = {
  quote: 'Quote',
  article: 'Article',
  tool: 'Tool',
};

const FILTERS = ['All', 'Quotes', 'Articles', 'Tools'] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_TO_KIND: Record<Filter, SavedEntry['kind'] | null> = {
  All: null,
  Quotes: 'quote',
  Articles: 'article',
  Tools: 'tool',
};

interface SavedItemsProps {
  savedQuotes: Record<string, boolean>;
  savedArticles: Record<string, boolean>;
  savedTools: Record<string, boolean>;
  onUnsaveQuote: (id: string) => void;
  onUnsaveArticle: (id: string) => void;
  onUnsaveTool: (name: string) => void;
}

export function SavedItems({
  savedQuotes,
  savedArticles,
  savedTools,
  onUnsaveQuote,
  onUnsaveArticle,
  onUnsaveTool,
}: SavedItemsProps) {
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');

  const entries = useMemo<SavedEntry[]>(() => {
    const quoteEntries: SavedEntry[] = QUOTES.filter((q) => savedQuotes[q.id]).map((q) => ({
      kind: 'quote',
      id: q.id,
      title: q.text,
      subtitle: q.author,
      body: `${q.text} ${q.author}`,
    }));
    const articleEntries: SavedEntry[] = ARTICLES.filter((a) => savedArticles[a.id]).map((a) => ({
      kind: 'article',
      id: a.id,
      title: a.headline,
      subtitle: `${a.source} · ${a.category}`,
      body: `${a.headline} ${a.summary} ${a.source} ${a.category}`,
    }));
    const toolEntries: SavedEntry[] = TOOLS.filter((t) => savedTools[t.name]).map((t) => ({
      kind: 'tool',
      id: t.name,
      title: t.name,
      subtitle: t.category,
      body: `${t.name} ${t.desc} ${t.category}`,
      url: t.url,
    }));
    return [...quoteEntries, ...articleEntries, ...toolEntries];
  }, [savedQuotes, savedArticles, savedTools]);

  const q = query.trim().toLowerCase();
  const filtered = entries.filter((e) => {
    const kindMatch = FILTER_TO_KIND[filter] === null || e.kind === FILTER_TO_KIND[filter];
    const queryMatch = !q || e.body.toLowerCase().includes(q);
    return kindMatch && queryMatch;
  });

  function unsave(entry: SavedEntry) {
    if (entry.kind === 'quote') onUnsaveQuote(entry.id);
    else if (entry.kind === 'article') onUnsaveArticle(entry.id);
    else onUnsaveTool(entry.id);
  }

  return (
    <section id="saved" className="dos-saved">
      <div className="dos-saved__header">
        <span className="dos-saved__dot" />
        <h2 className="dos-saved__title">Saved</h2>
        <span className="dos-saved__count">{entries.length}</span>
      </div>
      <p className="dos-saved__subtitle">Everything you've bookmarked — quotes, articles and tools, in one place.</p>

      {entries.length > 0 && (
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your saved items…"
          className="dos-saved__search"
        />
      )}

      <div className="dos-saved__chips">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`dos-saved__chip${f === filter ? ' dos-saved__chip--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="dos-saved__grid">
          {filtered.map((entry) => (
            <div key={`${entry.kind}-${entry.id}`} className="dos-saved__card">
              <span className={`dos-saved__tag dos-saved__tag--${entry.kind}`}>{KIND_LABEL[entry.kind]}</span>
              <button
                type="button"
                aria-label="Remove from saved"
                className="dos-saved__remove"
                onClick={() => unsave(entry)}
              >
                <X size={14} />
              </button>
              <p className={`dos-saved__card-title${entry.kind === 'quote' ? ' dos-saved__card-title--quote' : ''}`}>
                {entry.kind === 'quote' ? `“${entry.title}”` : entry.title}
              </p>
              <p className="dos-saved__card-subtitle">{entry.kind === 'quote' ? `— ${entry.subtitle}` : entry.subtitle}</p>
              {entry.kind === 'tool' && (
                <a href={entry.url} target="_blank" rel="noopener noreferrer" className="dos-saved__card-link">
                  Open <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="dos-saved__empty">
          {entries.length === 0
            ? 'Save a quote, article or tool anywhere on the page and it will show up here.'
            : `No saved items match "${query}".`}
        </div>
      )}
    </section>
  );
}
