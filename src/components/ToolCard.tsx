import { ArrowUpRight, Star } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Tool } from '../types';
import './ToolCard.css';

interface ToolCardProps {
  tool: Tool;
  gradient: string;
  favourited: boolean;
  delay: number;
  onToggleFavourite: () => void;
}

export function ToolCard({ tool, gradient, favourited, delay, onToggleFavourite }: ToolCardProps) {
  const style: CSSProperties & { '--pal'?: string } = {
    animationDelay: `${delay}s`,
    '--pal': gradient,
  };

  return (
    <div className="dos-tool-card" style={style}>
      <div className="dos-tool-card__icon">{tool.name[0]}</div>
      <div className="dos-tool-card__body">
        <div className="dos-tool-card__title-row">
          <span className="dos-tool-card__name">{tool.name}</span>
          <button
            type="button"
            aria-label="Favourite"
            className={`dos-tool-card__fav-btn${favourited ? ' dos-tool-card__fav-btn--active' : ''}`}
            onClick={onToggleFavourite}
          >
            <Star size={16} fill={favourited ? 'currentColor' : 'none'} />
          </button>
        </div>
        <p className="dos-tool-card__desc">{tool.desc}</p>
        <div className="dos-tool-card__footer">
          <span className="dos-tool-card__category">{tool.category}</span>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="dos-tool-card__open"
          >
            Open <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
