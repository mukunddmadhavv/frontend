import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Members from './pages/Members';
import Earnings from './pages/Earnings';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ExpiredMembers from './pages/ExpiredMembers';  
import AdminPage from './pages/AdminPage';

import PrivateRoute from './components/PrivateRoute'; // ✅ Import it

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
         
        {/* Protected routes */}

<Route path="/" element={
          <PrivateRoute><Home /></PrivateRoute>
        } />
       

        <Route path="/register" element={
          <PrivateRoute><Register /></PrivateRoute>
        } />


<Route path="/admin" element={
  <PrivateRoute><AdminPage /></PrivateRoute>
} />



        <Route path="/members" element={
          <PrivateRoute><Members /></PrivateRoute>
        } />

        <Route path="/earnings" element={
          <PrivateRoute><Earnings /></PrivateRoute>
        } />

        <Route path="/notifications" element={
          <PrivateRoute><Notifications /></PrivateRoute>
        } />


        <Route path="/expiredmembers" element={
          <PrivateRoute><ExpiredMembers /></PrivateRoute>
        } />


      </Routes>
    </Router>
  );
}

export default App;
