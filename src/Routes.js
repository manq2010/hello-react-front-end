import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Pages
import NotFoundPage from './pages/NotFoundPage';
import GreetingPage from './pages/GreetingPage';

const AppRoutes = () => (
  <Routes>
    <Route exact path="/" element={<GreetingPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
