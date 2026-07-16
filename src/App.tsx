import './App.css';
import { Header } from './components/Header';
import { QuoteHero } from './components/QuoteHero';
import { SavedItems } from './components/SavedItems';
import { NewsSection } from './components/NewsSection';
import { ToolsSection } from './components/ToolsSection';
import { Footer } from './components/Footer';
import { useTheme } from './hooks/useTheme';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [saved, setSaved] = useLocalStorage<Record<string, boolean>>('dos_saved', {});
  const [favs, setFavs] = useLocalStorage<Record<string, boolean>>('dos_favs', {});
  const [savedQuotes, setSavedQuotes] = useLocalStorage<Record<string, boolean>>('dos_saved_quotes', {});

  function toggleSaveArticle(id: string) {
    setSaved((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }

  function toggleFavourite(name: string) {
    setFavs((prev) => {
      const next = { ...prev };
      if (next[name]) delete next[name];
      else next[name] = true;
      return next;
    });
  }

  function toggleSaveQuote(id: string) {
    setSavedQuotes((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }

  return (
    <div id="top" data-theme={theme} className="dos-root">
      <div className="dos-ambient" />
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="dos-main">
        <QuoteHero saved={savedQuotes} onToggleSave={toggleSaveQuote} />
        <NewsSection saved={saved} onToggleSave={toggleSaveArticle} />
        <ToolsSection favs={favs} onToggleFavourite={toggleFavourite} />
        <SavedItems
          savedQuotes={savedQuotes}
          savedArticles={saved}
          savedTools={favs}
          onUnsaveQuote={toggleSaveQuote}
          onUnsaveArticle={toggleSaveArticle}
          onUnsaveTool={toggleFavourite}
        />
        <Footer />
      </main>
    </div>
  );
}
