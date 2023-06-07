import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  API_ENDPOINTS,
  useApiService
} from '../../utils';
import { UserContext } from '../../context';

const Login = () => {
  const navigate = useNavigate();
  const apiService = useApiService(); // Initialize the useApiService hook
  const { login } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiService.post(API_ENDPOINTS.LOGIN, { email, password });

      // Check if user is defined in the response
      if (response && response.user) {
        login(response.user);
        navigate('/'); // Redirect to the dashboard on successful login
      } else {
        setError('Invalid response from the server');
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className={loading ? 'loading' : ''}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
