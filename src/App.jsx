import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ActPage from './pages/ActPage';
import MomentPage from './pages/MomentPage';
import EpiloguePage from './pages/EpiloguePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/act/:actNumber" element={<ActPage />} />
      <Route path="/moment/:actNumber/:momentNumber" element={<MomentPage />} />
      <Route path="/epilogue" element={<EpiloguePage />} />
    </Routes>
  );
}

export default App;