// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all pages
import Home from './pages/Home';
import Register from './pages/Register';
import Members from './pages/Members';
import Earnings from './pages/Earnings';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import Signup from './pages/Signup';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/members" element={<Members />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/notifications" element={<Notifications />} />


        
      </Routes>
    </Router>
  );
}

export default App;
