import './App.css';
import { Header } from './components/Header';
import { GreetingStrip } from './components/GreetingStrip';
import { NewsSection } from './components/NewsSection';
import { ToolsSection } from './components/ToolsSection';
import { Footer } from './components/Footer';
import { useTheme } from './hooks/useTheme';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [saved, setSaved] = useLocalStorage<Record<string, boolean>>('dos_saved', {});
  const [favs, setFavs] = useLocalStorage<Record<string, boolean>>('dos_favs', {});

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

  return (
    <div id="top" data-theme={theme} className="dos-root">
      <div className="dos-ambient" />
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="dos-main">
        <GreetingStrip />
        <NewsSection saved={saved} onToggleSave={toggleSaveArticle} />
        <ToolsSection favs={favs} onToggleFavourite={toggleFavourite} />
        <Footer />
      </main>
    </div>
  );
}
