// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all pages
import Home from './pages/Home';
import Register from './pages/Register';
import Members from './pages/Members';
import Earnings from './pages/Earnings';
import Notifications from './pages/Notifications';
import SignupLogin from './pages/SignupLogin';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/members" element={<Members />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/signup" element={<SignupLogin />} />



        
      </Routes>
    </Router>
  );
}

export default App;
