// src/App.jsx
import React, { useState } from 'react';
import './App.css';

const BOOK_DATA = {
  title: "Project Alpha: The Genesis",
  chapters: [
    {
      id: 1,
      title: "Chapter 1: Ad Sanctorum",
      pages: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
      ]
    },
    {
      id: 2,
      title: "Chapter 2: Blah Blah Jibberish",
      pages: [
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
        "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.",
        "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus."
      ]
    },
    {
      id: 3,
      title: "Chapter 3: The Dashboard Horizon",
      pages: [
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Commodi autem vel eum iure.",
        "End of the preliminary transmission. Systems standing by for live asset integration, data parsing metrics, and interactive dashboard rendering."
      ]
    }
  ]
};

export default function App() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentChapter = BOOK_DATA.chapters[currentChapterIndex];
  const currentPageText = currentChapter.pages[currentPageIndex];

  const handleNextPage = () => {
    if (currentPageIndex < currentChapter.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else if (currentChapterIndex < BOOK_DATA.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      setCurrentPageIndex(0);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    } else if (currentChapterIndex > 0) {
      const prevChapterIndex = currentChapterIndex - 1;
      setCurrentChapterIndex(prevChapterIndex);
      setCurrentPageIndex(BOOK_DATA.chapters[prevChapterIndex].pages.length - 1);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰ Menu
        </button>
        <h1>{BOOK_DATA.title}</h1>
        <div className="progress-pill">
          Ch {currentChapter.id} · Pg {currentPageIndex + 1}/{currentChapter.pages.length}
        </div>
      </header>

      <div className="main-layout">
        <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <h3>Chapters</h3>
          <ul>
            {BOOK_DATA.chapters.map((ch, index) => (
              <li 
                key={ch.id} 
                className={index === currentChapterIndex ? 'active' : ''}
                onClick={() => {
                  setCurrentChapterIndex(index);
                  setCurrentPageIndex(0);
                  setSidebarOpen(false);
                }}
              >
                {ch.title}
              </li>
            ))}
          </ul>
        </nav>

        <main className="reading-canvas">
          <article className="reading-content">
            <h2>{currentChapter.title}</h2>
            <p className="book-text">{currentPageText}</p>
          </article>

          <footer className="reading-controls">
            <button 
              onClick={handlePrevPage} 
              disabled={currentChapterIndex === 0 && currentPageIndex === 0}
            >
              ← Prev
            </button>
            <button 
              onClick={handleNextPage} 
              disabled={currentChapterIndex === BOOK_DATA.chapters.length - 1 && currentPageIndex === currentChapter.pages.length - 1}
            >
              Next →
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}