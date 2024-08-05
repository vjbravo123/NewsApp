import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';

const categories = {
  allnews: ['Cricket', 'Entertainment', 'Health', 'Science', 'Technology'],
  topheadlinesNews: ['Business', 'Entertainment', 'General', 'Science', 'Sports', 'Technology']
};

const App = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [activeCategory, setActiveCategory] = useState('');
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNews = async (source, category) => {
    setLoading(true);
    const url = `${apiUrl}/api/news/${source}/${category}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setNewsItems(data.filter(article => article && article.content && article.urlToImage));
    } catch (error) {
      console.error('Error fetching news:', error);
      setNewsItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!activeCategory) {
      setActiveCategory('allnews/keyword');
    } else {
      const [source, category] = activeCategory.split('/');
      fetchNews(source, category);
    }
  }, [activeCategory]);

  return (
    <Router>
      <Navbar setSearchQuery={setSearchQuery} />
      <div className="container">
        <Sidebar
          categories={categories}
          setActiveCategory={setActiveCategory}
        />
        <Routes>
          <Route path="/" element={<Content newsItems={newsItems} loading={loading} searchQuery={searchQuery} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
