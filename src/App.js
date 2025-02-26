import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      setData((prevData) => [...prevData, ...response.data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setDisplayData(data);
    } else {
      const filtered = data.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setDisplayData(filtered);
    }
  }, [searchTerm, data]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">🚀 Infinite Scroll Posts</h1>
        <p className="subtitle">Seamlessly browse through posts with style!</p>
      </header>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="🔍 Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="post-list">
        {displayData.map((post) => (
          <li key={post.id} className="post-card">
            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body}</p>
            </div>
          </li>
        ))}
      </ul>
      {loading && <p className="loading">✨ Loading more posts... ✨</p>}
      <footer className="footer">
        <p>🔥 Powered by JSONPlaceholder API</p>
      </footer>
      <style jsx>{`
        .container {
          font-family: 'Arial', sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: #f4f4f8;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .title {
          font-size: 2.5rem;
          color: #333;
        }
        .subtitle {
          font-size: 1.2rem;
          color: #555;
        }
        .search-container {
          margin-bottom: 20px;
        }
        .search-bar {
          width: 100%;
          padding: 10px;
          font-size: 1rem;
          border: 2px solid #ddd;
          border-radius: 8px;
          outline: none;
        }
        .search-bar:focus {
          border-color: #007BFF;
        }
        .post-list {
          list-style: none;
          padding: 0;
        }
        .post-card {
          background: white;
          margin-bottom: 20px;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-in-out;
        }
        .post-card:hover {
          transform: translateY(-5px);
        }
        .post-title {
          font-size: 1.5rem;
          color: #333;
        }
        .post-body {
          font-size: 1rem;
          color: #555;
        }
        .loading {
          text-align: center;
          font-size: 1.2rem;
          color: #007BFF;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 0.9rem;
          color: #777;
        }
      `}</style>
    </div>
  );
};

export default App;
