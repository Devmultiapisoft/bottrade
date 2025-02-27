import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Select, MenuItem, Tabs, Tab, Paper, Grid, Box, Button } from '@mui/material';
import axios from 'axios';

// Trading Tabs
const searchTabs = ['All', 'Circle', 'One Shot', 'Stop Margin Call'];

const TradingPage = () => {
  const [searchTab, setSearchTab] = useState(0);
  const [coins, setCoins] = useState([]);

  // Fetch live coin data
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr'); // Binance API
        const filteredCoins = response.data.slice(0, 10).map(coin => ({
          symbol: coin.symbol,
          price: parseFloat(coin.lastPrice),
          change: parseFloat(coin.priceChangePercent),
          quantity: (Math.random() * 10).toFixed(4), // Simulated quantity
        }));
        setCoins(filteredCoins);
      } catch (error) {
        console.error('Error fetching Binance data:', error);
      }
    };

    fetchCoins();
  }, []);

  // UI Card for Each Coin
  const TradeCard = ({ coin, mode }) => {
    const getModeStyles = () => {
      switch (mode) {
        case 'Circle': return { background: 'linear-gradient(to bottom, purple, blue)' };
        case 'One Shot': return { background: 'linear-gradient(to bottom, red, orange)' };
        case 'Stop Margin Call': return { background: 'linear-gradient(to bottom, black, gray)' };
        default: return { background: 'linear-gradient(to bottom, green, blue)' };
      }
    };

    return (
      <Paper sx={{ p: 2, mt: 2, color: 'white', borderRadius: 2, ...getModeStyles() }}>
        <Typography variant="h6">{coin.symbol} - {mode}</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}><Typography>Quantity: {coin.quantity}</Typography></Grid>
          <Grid item xs={6}><Typography>Price: ${coin.price.toFixed(4)}</Typography></Grid>
          <Grid item xs={6}>
            <Typography>Change: <span style={{ color: coin.change < 0 ? 'red' : 'white' }}>{coin.change}%</span></Typography>
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ mt: 1 }}>Trade</Button>
      </Paper>
    );
  };

  // Sections for Different Modes
  const renderSection = (mode) => (
    <Box>
      {coins.map((coin, index) => (
        <TradeCard key={index} coin={coin} mode={mode} />
      ))}
    </Box>
  );

  return (
    <Box>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Binance</Typography>
          <Select defaultValue="Binance" sx={{ ml: 2, color: 'white' }}>
            <MenuItem value="Binance">Binance</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>

      {/* Search and Tabs */}
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Search Currency Name</Typography>
        <Tabs value={searchTab} onChange={(e, newValue) => setSearchTab(newValue)} variant="scrollable" scrollButtons="auto">
          {searchTabs.map((tab, index) => <Tab key={index} label={tab} />)}
        </Tabs>
      </Paper>

      {/* Content Based on Tabs */}
      <Box sx={{ p: 2 }}>
        {searchTab === 0 && renderSection('All')}
        {searchTab === 1 && renderSection('Circle')}
        {searchTab === 2 && renderSection('One Shot')}
        {searchTab === 3 && renderSection('Stop Margin Call')}
      </Box>

      {/* Bottom Navigation */}
      <Paper sx={{ position: 'fixed', bottom: 0, width: '100%', p: 2, textAlign: 'center', background: 'linear-gradient(to bottom, green, blue)' }}>
        <Typography>Binance Balance: 0.0000</Typography>
      </Paper>
    </Box>
  );
};

export default TradingPage;
