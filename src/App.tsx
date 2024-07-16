import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Counter from './pages/Counter';
import CryptoPriceComponent from './pages/CryptoPriceComponent';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />       
        <Route path="/price" element={<CryptoPriceComponent />} />

      </Routes>
    </Router>
  );
}

export default App;
