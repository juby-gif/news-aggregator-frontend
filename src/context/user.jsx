import React, { createContext, useState } from 'react';

// Create the user context
const UserContext = createContext();

// Create the user provider component
const UserProvider = ({ children }) => {
  // State for user and login status
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle user login
  const login = (userData) => {
    const updatedUser = {
      ...userData,
      preferredSources: [],
      preferredCategories: [],
      preferredAuthors: [],
    };
    updateUser(updatedUser);
    setIsLoggedIn(true);
  };

  // Function to handle user logout
  const logout = () => {
    updateUser(null);
    setIsLoggedIn(false);
  };

  // Function to update user preferences
  const updateUserPreferences = (preferences) => {
    updateUser((prevUser) => ({ ...prevUser, ...preferences }));
  };

  // Function to update the user state
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  // Create the context value
  const contextValue = {
    user,
    isLoggedIn,
    login,
    logout,
    updateUserPreferences,
  };

  // Render the user provider with the context value
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
