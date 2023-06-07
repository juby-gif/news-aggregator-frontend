import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { routes } from './utils';

// App component responsible for setting up routing in the application
const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.component}
            exact={route.exact}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
