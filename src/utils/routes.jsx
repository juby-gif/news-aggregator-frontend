import React from 'react';
import { Home, Login, Register } from '../pages';

/**
 * Routes configuration for the News Aggregator application
 */
export const routes = [
  { path: '/', component: <Home />, exact: true },
  { path: '/login', component: <Login /> },
  { path: '/register', component: <Register /> },
  // Add more routes as needed
];
