import React, { useState, useEffect } from 'react';
import { Moon, Sun, BookOpen, Compass, X, Type } from 'lucide-react';

const CHAPTERS = [
  { id: 1, title: 'Chapter I: The Genesis', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { id: 2, title: 'Chapter II: The Catalyst', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.' },
  { id: 3, title: 'Chapter III: The Network', content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.' }
];

export default function App() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [theme, setTheme] = useState('dark'); // 'light', 'dark', 'sepia'
  const [fontSize, setFontSize] = useState('md'); // 'sm', 'md', 'lg'
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Close palette on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsPaletteOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeChapter = CHAPTERS.find(ch => ch.id === currentChapter) || CHAPTERS[0];

  return (
    <div className={`app-container theme-${theme} size-${fontSize}`}>
      
      {/* Top Navigation Header */}
      <header className="navbar">
        <div className="nav-left">
          <BookOpen className="icon logo" />
          <span className="project-title">Project Genesis</span>
        </div>
        
        <div className="nav-right">
          {/* Theme Toggles */}
          <div className="theme-selector">
            <button onClick={() => setTheme('light')} className={`theme-btn ${theme === 'light' ? 'active' : ''}`} title="Light Mode"><Sun className="icon" /></button>
            <button onClick={() => setTheme('sepia')} className={`theme-btn ${theme === 'sepia' ? 'active' : ''}`} title="Sepia Mode"><span className="sepia-dot"></span></button>
            <button onClick={() => setTheme('dark')} className={`theme-btn ${theme === 'dark' ? 'active' : ''}`} title="Dark Mode"><Moon className="icon" /></button>
          </div>

          {/* Font Size Toggle */}
          <button 
            onClick={() => setFontSize(prev => prev === 'sm' ? 'md' : prev === 'md' ? 'lg' : 'sm')} 
            className="control-btn"
            title="Adjust Font Size"
          >
            <Type className="icon" />
          </button>

          {/* Navigation Palette Trigger */}
          <button onClick={() => setIsPaletteOpen(true)} className="control-btn palette-trigger">
            <Compass className="icon" />
            <span className="shortcut-hint">⌘K</span>
          </button>
        </div>
      </header>

      {/* Main Reading Canvas */}
      <main className="reading-canvas">
        <article className="reading-measure">
          <h1 className="chapter-title">{activeChapter.title}</h1>
          <p className="chapter-text">{activeChapter.content}</p>
        </article>
      </main>

      {/* Modern Command Palette Modal */}
      {isPaletteOpen && (
        <div className="palette-overlay" onClick={() => setIsPaletteOpen(false)}>
          <div className="palette-modal" onClick={e => e.stopPropagation()}>
            <div className="palette-header">
              <Compass className="icon text-muted" />
              <input type="text" placeholder="Jump to chapter..." disabled className="palette-input" />
              <button onClick={() => setIsPaletteOpen(false)} className="close-btn"><X className="icon" /></button>
            </div>
            <div className="palette-results">
              <div className="section-label">Chapters</div>
              {CHAPTERS.map(ch => (
                <button 
                  key={ch.id} 
                  onClick={() => {
                    setCurrentChapter(ch.id);
                    setIsPaletteOpen(false);
                  }}
                  className={`palette-item ${ch.id === currentChapter ? 'selected' : ''}`}
                >
                  <span className="item-number">0{ch.id}</span>
                  <span className="item-title">{ch.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}