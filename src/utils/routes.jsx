import React from 'react';
import { Home, Login, Register, Profile } from '../pages';

/**
 * Routes configuration for the News Aggregator application
 */
export const routes = [
  { path: '/', component: <Home />, exact: true, private: false },
  { path: '/login', component: <Login />, private: false },
  { path: '/register', component: <Register />, private: false },
  { path: '/user-profile', component: <Profile />, private: false },
  // Add more routes as needed
];
