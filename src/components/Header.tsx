import { Moon, Sun } from 'lucide-react';
import { SignatureLogo } from '../assets/SignatureLogo';
import type { Theme } from '../types';
import './Header.css';

const NAV_ITEMS = [
  { label: 'Home', target: 'top' as const },
  { label: 'News', target: 'news' as const },
  { label: 'Tools', target: 'tools' as const },
  { label: 'Saved', target: 'saved' as const },
  { label: 'Settings', target: 'top' as const },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) {
    scrollToTop();
    return;
  }
  const y = el.getBoundingClientRect().top + window.scrollY - 74;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="dos-header">
      <div className="dos-header__row">
        <a
          href="#top"
          className="dos-header__logo"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
        >
          <SignatureLogo className="dos-header__signature" aria-label="justin delucia" />
        </a>
        <div className="dos-header__actions">
          <nav className="dos-header__nav">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={`#${item.target}`}
                className="dos-header__link"
                onClick={(e) => {
                  e.preventDefault();
                  item.target === 'top' ? scrollToTop() : scrollToId(item.target);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            aria-label="Toggle theme"
            className="dos-header__theme-btn"
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
