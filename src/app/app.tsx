import { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { loadScript, gapiLoad, gisInit } from "common/utils/authUtils";
import Dashboard from "features/Dashboard";
import Home from "features/Home";

export const history = createBrowserHistory();

const App = () => {
  // Loads GIS and JS API libraries needed to work with Youtube Data API v3
  // Within a useEffect to allow the code to be in react files and not in .html ones
  useEffect(() => {
    loadScript("https://apis.google.com/js/api.js", gapiLoad);
    loadScript("https://accounts.google.com/gsi/client", gisInit);
  }, []);

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </HistoryRouter>
  );
};

export default App;
