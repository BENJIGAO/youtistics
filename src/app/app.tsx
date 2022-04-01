import React, { useEffect } from 'react';
import { Routes, Route, Navigate, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { loadScript, gapiLoad, gisInit } from 'common/utils/authUtils';
import Home from 'features/Home';
import Dashboard from 'features/Dashboard';

export const history = createBrowserHistory()

const App: React.FC = () => {
  useEffect(() => {
    loadScript('https://apis.google.com/js/api.js', gapiLoad)
    loadScript('https://accounts.google.com/gsi/client', gisInit)
  }, [])

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/' element={<Navigate to='/dashboard' />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
