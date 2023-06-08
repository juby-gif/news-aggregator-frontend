import React, { useState, useContext } from 'react';
import { Header, SearchBar, ArticleCard } from '../../components';
import './Home.css';
import { API_ENDPOINTS, useApiService } from '../../utils';
import { UserContext } from '../../context';

const Home = () => {
  const { updateArticles, articles } = useContext(UserContext);
  const apiService = useApiService();

  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    author: '',
    date: '',
    source: '',
  });
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (keyword.length > 0) {
        const keywordString = keyword.join(',');
        const response = await apiService.get(API_ENDPOINTS.FETCH_ARTICLES, {
          keyword: keywordString,
        });

        transformResponse(response);
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value === '' ? [] : value,
    }));
  };

  const transformResponse = (response) => {
    if (response && Object.keys(response).length > 0) {
      const articles = Object.keys(response).reduce((result, key) => {
        switch (key) {
          case 'newsapi':
            return result.concat(transformNewsAPIArticles(response[key].articles));

          case 'theguardian':
            return result.concat(transformGuardianArticles(response[key].response.results));

          case 'nytimes':
            return result.concat(transformNYTimesArticles(response[key].response.docs));

          default:
            console.log('Invalid');
            return result;
        }
      }, []);

      updateArticles(articles);
    }
  };

  const transformNewsAPIArticles = (articles) => {
    return articles.map((article) => {
      const {
        title,
        description: subtitle,
        content: description,
        source: { name: source },
        author,
        url: redirectLink,
        urlToImage: img,
        publishedAt: date,
      } = article;

      return { title, subtitle, description, source, author, redirectLink, img, date };
    });
  };

  const transformGuardianArticles = (articles) => {
    return articles.map((article) => {
      const { id, sectionName: category, webUrl: redirectLink, webTitle: title, author } = article;
      return { id, category, redirectLink, title, author };
    });
  };

  const transformNYTimesArticles = (articles) => {
    return articles.map((article) => {
      const {
        _id: id,
        section_name: category,
        web_url: redirectLink,
        headline: { main: title },
        source,
        abstract: subtitle,
        pub_date: date,
      } = article;

      return { id, title, category, redirectLink, source, subtitle, date };
    });
  };

  const filterArticles = (articles, date) => {
    return articles.filter((article) => {
      if (date && article.date !== date) {
        return false;
      }

      if (selectedFilters.author.length > 0 && !selectedFilters.author.includes(article.author)) {
        return false;
      }

      if (selectedFilters.source && article.source !== selectedFilters.source) {
        return false;
      }

      if (selectedFilters.category && article.category !== selectedFilters.category) {
        return false;
      }

      return true;
    });
  };

  const filteredArticles = filterArticles(articles, selectedFilters.date);

  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="container">
        <div>
          <SearchBar
            loading={loading}
            error={error}
            keyword={keyword}
            setKeyword={setKeyword}
            selectedFilters={selectedFilters}
            handleSearch={handleSearch}
            setSelectedFilters={setSelectedFilters}
            handleFilterChange={handleFilterChange}
          />
        </div>
        <div className="article-section">
          {filteredArticles.map((article, id) => (
            <ArticleCard key={id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
