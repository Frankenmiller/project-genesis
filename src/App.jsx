import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, BookOpen, Compass, X, Type, ChevronLeft, ChevronRight } from 'lucide-react';

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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit animi id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
    ]
  },
  { 
    id: 2, 
    title: "Chapter II: The Catalyst", 
    content: [
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
      "Et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore."
    ]
  }
];

export default function App() {
  const [viewMode, setViewMode] = useState('cover'); 
  const [currentChapter, setCurrentChapter] = useState(0); 
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('md');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const activeChapter = CHAPTERS.find(ch => ch.id === currentChapter) || CHAPTERS[0];

  const calculatePages = () => {
    if (trackRef.current && viewportRef.current && viewMode === 'reading') {
      const scrollWidth = trackRef.current.scrollWidth;
      const clientWidth = viewportRef.current.clientWidth;
      if (clientWidth > 0) {
        const pages = Math.ceil(scrollWidth / clientWidth);
        setTotalPages(pages || 1);
      }
    }
  };

  useEffect(() => {
    calculatePages();
    const timer = setTimeout(calculatePages, 150);
    window.addEventListener('resize', calculatePages);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePages);
    };
  }, [viewMode, currentChapter, fontSize, theme]);

  const handleSelectChapter = (id) => {
    setCurrentChapter(id);
    setPageIndex(0);
    setViewMode('reading');
    setIsPaletteOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsPaletteOpen(false);

      if (viewMode === 'reading' && !isPaletteOpen) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          setPageIndex(prev => Math.min(prev + 1, totalPages - 1));
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setPageIndex(prev => Math.max(prev - 1, 0));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, isPaletteOpen, totalPages]);

  // Force app shell classes to synchronize instantly with application state
  useEffect(() => {
    const root = document.documentElement;
    // Clear old state tracking attributes
    root.className = '';
    root.classList.add(`theme-${theme}`);
    root.classList.add(`size-${fontSize}`);
  }, [theme, fontSize]);

  // Handle explicit background shifts for the popups based on state
  const modalBg = theme === 'dark' ? '#111111' : theme === 'sepia' ? '#f4ecd8' : '#ffffff';
  const modalText = theme === 'dark' ? '#ffffff' : '#000000';
// 1. Define explicit color and font maps right above the return statement
  const themeStyles = {
    dark: { bg: '#111111', text: '#ffffff', border: 'rgba(255,255,255,0.1)', hover: 'rgba(255,255,255,0.05)' },
    light: { bg: '#ffffff', text: '#000000', border: 'rgba(0,0,0,0.1)', hover: 'rgba(0,0,0,0.05)' },
    sepia: { bg: '#f4ecd8', text: '#5b4636', border: 'rgba(91,70,54,0.15)', hover: 'rgba(91,70,54,0.05)' }
  };

  const fontSizeStyles = {
    sm: { fontSize: '0.9rem', lineHeight: '1.6' },
    md: { fontSize: '1.1rem', lineHeight: '1.7' },
    lg: { fontSize: '1.3rem', lineHeight: '1.8' }
  };

  const currentColors = themeStyles[theme] || themeStyles.dark;

  return (
    <div 
      className={`app-container theme-${theme} size-${fontSize}`} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh', 
        width: '100vw', 
        overflow: 'hidden', 
        position: 'relative',
        background: currentColors.bg,   /* <-- Enforced Background */
        color: currentColors.text       /* <-- Enforced Text Color */
      }}
    >
      
      {/* Navbar Header */}
      <header className="navbar" style={{ height: '64px', minHeight: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 2rem', boxSizing: 'border-box', borderBottom: `1px solid ${currentColors.border}`, zIndex: 90, position: 'relative' }}>
        <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setViewMode('cover')}>
          <BookOpen className="icon logo" style={{ width: '20px', height: '20px' }} />
          <span className="project-title" style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>Project Genesis</span>
        </div>
        
        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="theme-selector" style={{ display: 'flex', gap: '0.25rem', background: currentColors.hover, padding: '0.25rem', borderRadius: '8px', border: `1px solid ${currentColors.border}` }}>
            <button 
              onClick={() => setTheme('light')} 
              style={{ border: 'none', background: theme === 'light' ? 'rgba(0,0,0,0.1)' : 'transparent', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', color: 'inherit' }}
            >
              <Sun className="icon" style={{ width: '16px', height: '16px' }} />
            </button>
            <button 
              onClick={() => setTheme('sepia')} 
              style={{ border: 'none', background: theme === 'sepia' ? 'rgba(0,0,0,0.1)' : 'transparent', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span className="sepia-dot" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f4ecd8', display: 'block', border: '1px solid rgba(0,0,0,0.15)' }}></span>
            </button>
            <button 
              onClick={() => setTheme('dark')} 
              style={{ border: 'none', background: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'transparent', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', color: 'inherit' }}
            >
              <Moon className="icon" style={{ width: '16px', height: '16px' }} />
            </button>
          </div>

          {/* Font Size Button with inline text indicator */}
          <button 
            onClick={() => setFontSize(prev => prev === 'sm' ? 'md' : prev === 'md' ? 'lg' : 'sm')} 
            className="control-btn" 
            style={{ border: `1px solid ${currentColors.border}`, background: 'transparent', padding: '0.5rem 0.75rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'inherit' }}
          >
            <Type className="icon" style={{ width: '18px', height: '18px' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', opacity: 0.8 }}>{fontSize}</span>
          </button>
          
          <button onClick={() => setIsPaletteOpen(true)} className="control-btn palette-trigger" style={{ border: `1px solid ${currentColors.border}`, background: 'transparent', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit' }}>
            <Compass className="icon" style={{ width: '18px', height: '18px' }} />
            <span className="shortcut-hint" style={{ fontSize: '0.75rem', opacity: 0.6, fontFamily: 'monospace' }}>⌘K</span>
          </button>
        </div>
      </header>
      {/* Main Context Area */}
      <main className="reading-canvas" style={{ flex: 1, position: 'relative', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
        {viewMode === 'cover' ? (
          /* --- FRONT COVER VIEW --- */
          <div style={{ maxWidth: '68ch', margin: 'auto auto', padding: '2rem', width: '100%', boxSizing: 'border-box' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '1rem' }}>
              BUILD // LIVE_0.2
            </p>
            <h1 className="cover-main-title" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
              PROJECT <br /> FRANKENMILLER
            </h1>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.5, opacity: 0.8, marginBottom: '2.5rem' }}>
              A decentralized city-building simulation and network narrative ecosystem.
            </p>
            <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '2rem' }}>
              <button 
                onClick={() => { setViewMode('reading'); setPageIndex(0); }}
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
          /* --- FIXED VIEWPORT BOOK ENGINE --- */
          <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', overflow: 'hidden', flexDirection: 'column' }}>
            
            {/* Previous Page Target Zone - CRITICAL: Top starts below navbar */}
            <div 
              onClick={() => setPageIndex(prev => Math.max(prev - 1, 0))}
              style={{
                position: 'absolute', left: 0, top: 0, bottom: '3.5rem', width: '15%',
                cursor: pageIndex === 0 ? 'default' : 'pointer', zIndex: 30, display: 'flex',
                alignItems: 'center', justifyContent: 'center'
              }}
              className="page-nav-zone"
            >
              <ChevronLeft className="nav-arrow-icon" style={{ opacity: pageIndex === 0 ? 0 : 0.4 }} />
            </div>

            {/* Main Center Viewport */}
            <div 
              ref={viewportRef}
              style={{
                width: '100%', maxWidth: '68ch', margin: '0 auto', flex: 1,
                overflow: 'hidden', paddingTop: '3rem', paddingBottom: '1rem', boxSizing: 'border-box',
                position: 'relative'
              }}
            >
              <div 
                ref={trackRef}
                className="book-text-columns"
                style={{ 
                  height: '100%',
                  transform: `translateX(-${pageIndex * 100}%)`,
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  columnWidth: '100%',
                  columnGap: '4rem',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  boxSizing: 'border-box',
                  transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              >
                <h1 className="chapter-title" style={{ margin: '0 0 2rem 0', width: '100%', fontWeight: 700, letterSpacing: '-0.03em', color: 'inherit' }}>{activeChapter.title}</h1>
                {activeChapter.content.map((paragraph, index) => (
                    <p 
                      key={index} 
                      className="chapter-text" 
                      style={{ 
                        margin: '0 0 1.5rem 0', 
                        width: '100%', 
                        breakInside: 'avoid', 
                        textAlign: 'left', 
                        color: 'inherit',
                        ...fontSizeStyles[fontSize] /* <-- Injects line-height and size instantly */
                      }}
                    >
                      {paragraph}
                    </p>
                ))}
              </div>
            </div>

            {/* Next Page Target Zone */}
            <div 
              onClick={() => setPageIndex(prev => Math.min(prev + 1, totalPages - 1))}
              style={{
                position: 'absolute', right: 0, top: 0, bottom: '3.5rem', width: '15%',
                cursor: pageIndex === totalPages - 1 ? 'default' : 'pointer', zIndex: 30, display: 'flex',
                alignItems: 'center', justifyContent: 'center'
              }}
              className="page-nav-zone"
            >
              <ChevronRight className="nav-arrow-icon" style={{ opacity: pageIndex === totalPages - 1 ? 0 : 0.4 }} />
            </div>

            {/* Fixed Pagination Bar */}
            <footer className="book-progress-footer" style={{ width: '100%', boxSizing: 'border-box', height: '3.5rem', zIndex: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0.5rem 2rem', borderTop: '1px dashed var(--border-color)', background: 'var(--app-bg)' }}>
              <div className="progress-stats" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.25rem' }}>
                <span>{activeChapter.title}</span>
                <span>Page {pageIndex + 1} of {totalPages}</span>
              </div>
              <div className="progress-bar-track" style={{ width: '100%', height: '3px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
                <div className="progress-bar-fill" style={{ height: '100%', background: 'currentColor', opacity: 0.7, width: `${((pageIndex + 1) / totalPages) * 100}%`, transition: 'width 0.3s ease' }} />
              </div>
            </footer>
          </div>
        )}
      </main>

      {/* COMMAND PALETTE OVERLAY MODAL */}
      {isPaletteOpen && (
        <div 
          onClick={() => setIsPaletteOpen(false)} 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}
        >
          <div 
            onClick={e => e.stopPropagation()} 
            style={{ width: '100%', maxWidth: '500px', background: modalBg, color: modalText, border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--border-color)', gap: '0.75rem' }}>
              <Compass style={{ width: '18px', height: '18px', opacity: 0.5 }} />
              <input type="text" placeholder="Jump to section..." disabled style={{ flex: 1, background: 'transparent', border: 'none', color: 'inherit', fontSize: '1rem', outline: 'none' }} />
              <button onClick={() => setIsPaletteOpen(false)} style={{ background: 'transparent', border: 'none', color: modalText, cursor: 'pointer', display: 'flex', padding: '0.25rem', opacity: 0.6 }}><X style={{ width: '18px', height: '18px' }} /></button>
            </div>
            
            <div style={{ padding: '0.5rem', maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontFamily: 'monospace', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Navigation</div>
              <button 
                onClick={() => { setViewMode('cover'); setIsPaletteOpen(false); }}
                style={{ display: 'flex', width: '100%', padding: '0.75rem', background: viewMode === 'cover' ? 'var(--hover-bg)' : 'transparent', border: 'none', color: 'inherit', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', alignItems: 'center', gap: '0.75rem' }}
              >
                <span style={{ fontFamily: 'monospace', opacity: 0.4 }}>◇◇</span>
                <span style={{ fontWeight: viewMode === 'cover' ? 600 : 400 }}>Front Cover</span>
              </button>

              <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontFamily: 'monospace', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.5rem' }}>Structure</div>
              {CHAPTERS.map(ch => (
                <button 
                  key={ch.id} 
                  onClick={() => handleSelectChapter(ch.id)}
                  style={{ display: 'flex', width: '100%', padding: '0.75rem', background: viewMode === 'reading' && ch.id === currentChapter ? 'var(--hover-bg)' : 'transparent', border: 'none', color: 'inherit', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', alignItems: 'center', gap: '0.75rem' }}
                >
                  <span style={{ fontFamily: 'monospace', opacity: 0.4 }}>{ch.id === 0 ? '00' : `0${ch.id}`}</span>
                  <span style={{ fontWeight: viewMode === 'reading' && ch.id === currentChapter ? 600 : 400 }}>{ch.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}