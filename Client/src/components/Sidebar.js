import React, { useState } from 'react';
import '../css/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNewspaper,
  faGlobe,
  faStar,
  faBusinessTime,
  faHeartbeat,
  faLaptopCode,
  faFilm,
  faFutbol,
  faFlask,
  faTheaterMasks,
  faBaseballBall,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ categories, setActiveCategory }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Default to hidden

  const handleCategoryClick = (source, category) => {
    setActiveCategory(`${source}/${category}`);
    if (window.innerWidth <= 768) {
      setIsSidebarVisible(false); // Hide sidebar on mobile after selection
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev);
  };

  const categoryIcons = {
    allnews: {
      cricket: faBaseballBall,
      entertainment: faTheaterMasks,
      health: faHeartbeat,
      science: faFlask,
      technology: faLaptopCode,
    },
    topheadlinesNews: {
      business: faBusinessTime,
      entertainment: faTheaterMasks,
      general: faGlobe,
      science: faFlask,
      sports: faFutbol,
      technology: faLaptopCode,
    },
  };

  const getIcon = (source, category) => {
    return categoryIcons[source][category.toLowerCase()] || faNewspaper;
  };

  return (
    <>
      <button className={`menu-button ${isSidebarVisible ? 'hidden' : ''}`} onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isSidebarVisible ? 'show' : 'hidden'}`}>
        <div className="category-section">
          <h3>All News</h3>
          {categories.allnews.map((category) => (
            <div
              key={category}
              className="category"
              onClick={() => handleCategoryClick('allnews', category)}
            >
              <FontAwesomeIcon icon={getIcon('allnews', category)} className="category-icon" />
              {category}
            </div>
          ))}
        </div>
        <div className="category-section">
          <h3>Top Headlines</h3>
          {categories.topheadlinesNews.map((category) => (
            <div
              key={category}
              className="category"
              onClick={() => handleCategoryClick('topheadlinesNews', category.toLowerCase())}
            >
              <FontAwesomeIcon icon={getIcon('topheadlinesNews', category)} className="category-icon" />
              {category}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
