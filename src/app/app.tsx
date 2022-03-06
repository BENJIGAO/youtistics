import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from 'features/Home';
import Dashboard from 'features/Dashboard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/' element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;
