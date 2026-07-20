import React, { useState, useEffect } from 'react';
import { Moon, Sun, BookOpen, Compass, X, Type } from 'lucide-react';

const CHAPTERS = [
  { 
    id: 0, 
    title: "Foreword: A Note from the Author", 
    content: [
      "Welcome to Project Genesis. This live digital text represents an ongoing, real-time convergence of architectural software engineering and decentralized narrative design.",
      "Built to be volatile, iterative, and responsive, this application serves as both the delivery mechanism and a living artifact of the ideas contained within.",
      "Thank you for stepping into the framework."
    ]
  },
  { 
    id: 1, 
    title: "Chapter I: The Genesis", 
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    ]
  }
];

export default function App() {
  const [viewMode, setViewMode] = useState('cover'); // 'cover' or 'reading'
  const [currentChapter, setCurrentChapter] = useState(0); 
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('md');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (viewMode === 'reading') setIsPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsPaletteOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  const activeChapter = CHAPTERS.find(ch => ch.id === currentChapter) || CHAPTERS[0];

  const handleSelectChapter = (id) => {
    setCurrentChapter(id);
    setViewMode('reading');
    setIsPaletteOpen(false);
  };

  return (
    <div className={`app-container theme-${theme} size-${fontSize}`}>
      
      {/* Navbar Header */}
      <header className="navbar">
        <div className="nav-left" style={{ cursor: 'pointer' }} onClick={() => setViewMode('cover')}>
          <BookOpen className="icon logo" />
          <span className="project-title">Project Genesis</span>
        </div>
        
        <div className="nav-right">
          <div className="theme-selector">
            <button onClick={() => setTheme('light')} className={`theme-btn ${theme === 'light' ? 'active' : ''}`} title="Light Mode"><Sun className="icon" /></button>
            <button onClick={() => setTheme('sepia')} className={`theme-btn ${theme === 'sepia' ? 'active' : ''}`} title="Sepia Mode"><span className="sepia-dot"></span></button>
            <button onClick={() => setTheme('dark')} className={`theme-btn ${theme === 'dark' ? 'active' : ''}`} title="Dark Mode"><Moon className="icon" /></button>
          </div>

          {viewMode === 'reading' && (
            <>
              <button 
                onClick={() => setFontSize(prev => prev === 'sm' ? 'md' : prev === 'md' ? 'lg' : 'sm')} 
                className="control-btn"
                title="Adjust Font Size"
              >
                <Type className="icon" />
              </button>

              <button onClick={() => setIsPaletteOpen(true)} className="control-btn palette-trigger">
                <Compass className="icon" />
                <span className="shortcut-hint">⌘K</span>
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Canvas Area */}
      <main className="reading-canvas">
        <article className="reading-measure">
          
          {viewMode === 'cover' ? (
            /* --- TEXT-BASED FRONT COVER VIEW --- */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginTop: '10vh' }}>
              <div>
                <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '1rem' }}>
                  BUILD // LIVE_0.1
                </p>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
                  PROJECT <br /> FRANKENMILLER
                </h1>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.5, opacity: 0.8, maxWidth: '50ch' }}>
                  A decentralized city-building simulation and network narrative ecosystem.
                </p>
              </div>

              <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '2rem' }}>
                <button 
                  onClick={() => setViewMode('reading')}
                  style={{
                    background: 'var(--hover-bg)',
                    color: 'inherit',
                    border: '1px solid var(--border-color)',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Open Framework →
                </button>
              </div>
            </div>
          ) : (
            /* --- IMMERSIVE READING VIEW --- */
            <>
              <h1 className="chapter-title">{activeChapter.title}</h1>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {activeChapter.content.map((paragraph, index) => (
                  <p key={index} className="chapter-text">{paragraph}</p>
                ))}
              </div>
            </>
          )}

        </article>
      </main>

      {/* Command Palette Modal */}
      {isPaletteOpen && (
        <div className="palette-overlay" onClick={() => setIsPaletteOpen(false)}>
          <div className="palette-modal" onClick={e => e.stopPropagation()}>
            <div className="palette-header">
              <Compass className="icon text-muted" />
              <input type="text" placeholder="Jump to chapter..." disabled className="palette-input" />
              <button onClick={() => setIsPaletteOpen(false)} className="close-btn"><X className="icon" /></button>
            </div>
            <div className="palette-results">
              <div className="section-label">Structure</div>
              {CHAPTERS.map(ch => (
                <button 
                  key={ch.id} 
                  onClick={() => handleSelectChapter(ch.id)}
                  className={`palette-item ${ch.id === currentChapter ? 'selected' : ''}`}
                >
                  <span className="item-number">{ch.id === 0 ? '00' : `0${ch.id}`}</span>
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