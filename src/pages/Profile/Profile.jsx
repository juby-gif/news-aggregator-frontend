import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [newsFeed, setNewsFeed] = useState([]);

  // Fetch categories, sources, and authors from API
  useEffect(() => {
    fetchCategories();
    fetchSources();
    fetchAuthors();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://api.example.com/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSources = async () => {
    try {
      const response = await axios.get('https://api.example.com/sources');
      setSources(response.data);
    } catch (error) {
      console.error('Error fetching sources:', error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('https://api.example.com/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  // Update selected preferences
  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedCategories(selectedOptions);
  };

  const handleSourceChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedSources(selectedOptions);
  };

  const handleAuthorChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedAuthors(selectedOptions);
  };

//   // Fetch personalized news feed based on selected preferences
//   useEffect(() => {
//     fetchNewsFeed();
//   }, [selectedCategories, selectedSources, selectedAuthors]);

//   const fetchNewsFeed = async () => {
//     try {
//       const response = await axios.get(
//         'https://api.example.com/news-feed',
//         {
//           params: {
//             categories: selectedCategories.join(','),
//             sources: selectedSources.join(','),
//             authors: selectedAuthors.join(','),
//           },
//         }
//       );
//       setNewsFeed(response.data);
//     } catch (error) {
//       console.error('Error fetching news feed:', error);
//     }
//   };

  return (
    <div>
      <h1>User Profile</h1>

      <h2>Preferences</h2>
      <div>
        <label>Categories:</label>
        <select multiple value={selectedCategories} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Sources:</label>
        <select multiple value={selectedSources} onChange={handleSourceChange}>
          {sources.map((source) => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Authors:</label>
        <select multiple value={selectedAuthors} onChange={handleAuthorChange}>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <h2>News Feed</h2>
      {newsFeed.map((news) => (
        <div key={news.id}>
          <h3>{news.title}</h3>
          <p>{news.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
