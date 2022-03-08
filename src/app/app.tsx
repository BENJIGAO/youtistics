import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { loadScript, gapiLoad } from 'common/utils/authUtils';
import Home from 'features/Home';
import Dashboard from 'features/Dashboard';

const App: React.FC = () => {
  useEffect(() => {
    loadScript('https://apis.google.com/js/api.js', gapiLoad)
    loadScript('https://accounts.google.com/gsi/client', () => console.log('gsi/client loaded...'))
  }, [])
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/' element={<Navigate to='/home' />} />
    </Routes>
  );
}

export default App;
