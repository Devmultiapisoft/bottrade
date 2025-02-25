import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import TradePage from './pages/TradePage';
import LoginPage from './pages/LoginPage';
import MarketsPage from './pages/MarketPage';
import EarnPage from './pages/EarnPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Trade" element={<TradePage />} />
          <Route path="/earn" element={<EarnPage />} />
          <Route path="/market" element={<MarketsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;