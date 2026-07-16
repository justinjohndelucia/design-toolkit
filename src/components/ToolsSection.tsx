import { useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { TOOL_ORDER, TOOLS } from '../data/tools';
import { PAL } from '../data/palette';
import { ToolCard } from './ToolCard';
import './ToolsSection.css';

interface ToolsSectionProps {
  favs: Record<string, boolean>;
  onToggleFavourite: (name: string) => void;
}

export function ToolsSection({ favs, onToggleFavourite }: ToolsSectionProps) {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const el = searchRef.current;
      if (!el) return;
      const typing =
        document.activeElement instanceof HTMLElement &&
        /input|textarea/i.test(document.activeElement.tagName);
      if ((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
        el.focus();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const q = query.trim().toLowerCase();

  const filteredTools = useMemo(() => {
    if (!q) return TOOLS;
    const words = q.split(/\s+/);
    return TOOLS.filter((t) => {
      const hay = [t.name, t.category, t.desc, ...t.keywords].join(' ').toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [q]);

  const groups = useMemo(() => {
    const map: Record<string, typeof TOOLS> = {};
    filteredTools.forEach((t) => {
      (map[t.category] ??= []).push(t);
    });
    let gi = 0;
    return TOOL_ORDER.filter((c) => map[c]).map((category) => ({
      category,
      tools: map[category].map((tool) => ({ tool, gradient: PAL[gi++ % PAL.length] })),
    }));
  }, [filteredTools]);

  return (
    <section id="tools" className="dos-tools">
      <div className="dos-tools__header">
        <div className="dos-tools__title-row">
          <span className="dos-tools__dot" />
          <h2 className="dos-tools__title">Favourite Tools</h2>
        </div>
        <p className="dos-tools__subtitle">Your launchpad — search by name, use or category.</p>
      </div>

      <div className="dos-tools__search-wrap">
        <span className="dos-tools__search-icon">
          <Search size={18} />
        </span>
        <input
          ref={searchRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search tools…  try "colour", "research", "presentation"'
          className="dos-tools__search-input"
        />
        <span className="dos-tools__search-kbd-wrap">
          <kbd className="dos-tools__search-kbd">/</kbd>
        </span>
      </div>

      {q.length > 0 && (
        <div className="dos-tools__result-label">
          {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
        </div>
      )}

      <div className="dos-tools__groups">
        {groups.map((group) => (
          <div key={group.category}>
            <div className="dos-tools__group-header">
              <h3 className="dos-tools__group-title">{group.category}</h3>
              <span className="dos-tools__group-rule" />
              <span className="dos-tools__group-count">{group.tools.length}</span>
            </div>
            <div className="dos-tools__grid">
              {group.tools.map(({ tool, gradient }, i) => (
                <ToolCard
                  key={tool.name}
                  tool={tool}
                  gradient={gradient}
                  favourited={!!favs[tool.name]}
                  delay={i * 0.02}
                  onToggleFavourite={() => onToggleFavourite(tool.name)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {q.length > 0 && filteredTools.length === 0 && (
        <div className="dos-tools__empty">
          <div className="dos-tools__empty-title">No tools match &ldquo;{query}&rdquo;</div>
          <div className="dos-tools__empty-body">Try a broader term like &ldquo;design&rdquo; or &ldquo;research&rdquo;.</div>
        </div>
      )}
    </section>
  );
}
