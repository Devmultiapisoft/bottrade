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
import Profile from './pages/Profile';
import IncomeBalance from './pages/IncomeBalance';
import Deposit from './pages/Deposit';
import TransactionHistory from './pages/TransactionHistory';
import SupportPage from './pages/SupportPage';
import ErrorNotifications from './pages/ErrorNotifications';
import TradeDetails from './pages/TradeDetails';

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/income-balance" element={<IncomeBalance />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/errors" element={<ErrorNotifications />} />
          <Route path="/details/:symbol/:symbol" element={<TradeDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;