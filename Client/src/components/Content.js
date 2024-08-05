import React from 'react';
import '../css/content.css';

const highlightText = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.split(regex).map((part, index) =>
    regex.test(part) ? <span key={index} className="highlight">{part}</span> : part
  );
};

const Content = ({ newsItems, loading, searchQuery }) => {
  // Sort news items based on search query
  const sortedNewsItems = [...newsItems].sort((a, b) => {
    const aMatches = (a.title + a.content).toLowerCase().includes(searchQuery.toLowerCase());
    const bMatches = (b.title + b.content).toLowerCase().includes(searchQuery.toLowerCase());
    return bMatches - aMatches; // Move matching items to the top
  });

  return (
    <div className={`content ${loading ? 'loading' : 'loaded'}`}>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="news-grid">
          {sortedNewsItems.map((newsItem, index) => (
            <div key={index} className="news-item">
              <img src={newsItem.urlToImage} alt={newsItem.title} />
              <h3>{highlightText(newsItem.title, searchQuery)}</h3>
              <p>{highlightText(newsItem.content, searchQuery)}</p>
              <a href={newsItem.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Content;
