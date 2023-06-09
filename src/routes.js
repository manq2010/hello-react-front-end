import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import Greeting from './components/Greeting';

const AppRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Greeting />} />
  </Routes>
);

export default AppRoutes;
