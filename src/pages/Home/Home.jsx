import React, { useState } from 'react';

import {Card} from '../../components';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    authors: '',
    date: '',
  });
  // const [articles, setArticles] = useState([]);

  const handleSearch = () => {
    // Perform search based on searchQuery and selectedFilters
    // Update the articles state with the search results
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div style={{display:'flex',flexGrow:1, flexBasis:1, justifyContent:'center'}}>
      <Card /><Card /><Card /><Card /><Card /><Card /><Card /><Card /><Card />
      </div>

      <div className="filters">
        <select
          value={selectedFilters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {/* Render options for categories */}ssssssssssssssssss
        </select>

        <select
          value={selectedFilters.authors}
          onChange={(e) => handleFilterChange('authors', e.target.value)}
        >
          <option value="">All Authors</option>
          {/* Render options for authors */}sssssssssssssss
        </select>

        <input
          type="date"
          value={selectedFilters.date}
          onChange={(e) => handleFilterChange('date', e.target.value)}
        />
      </div>

      <div className="search-results">
        {/* Render articles based on the search results */}ssssssssssss
      </div>

      <div className="preferences">
        {/* Render preference settings */}sssssssssssssssssss
      </div>
    </div>
  );
};

export default Home;
