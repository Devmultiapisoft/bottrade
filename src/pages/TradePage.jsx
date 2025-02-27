import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Select, MenuItem, Tabs, Tab, Paper, Grid, Box, Button, TextField } from '@mui/material';

// Sample Data
const initialCoins = [
  { symbol: '1INCHDOWN/USDT', quantity: 0, price: 0.00000000, increase: 0 },
  { symbol: '1INCH/USDT', quantity: 0, price: 0.24440000, increase: -4.702 },
  { symbol: 'AAVE/USDT', quantity: 0, price: 205.47000000, increase: -1.278 },
  { symbol: 'ADA/USDT', quantity: 0, price: 0.00000000, increase: 0 },
];

// Trade Card Component
const TradeCard = ({ coin }) => (
  <Paper sx={{ p: 2, mt: 2, background: 'linear-gradient(to bottom, #4bae54, rgb(39 153 220))', color: 'white', borderRadius: 2 }}>
    <Typography variant="h6">{coin.symbol}</Typography>
    <Grid container spacing={1}>
      <Grid item xs={6}><Typography>Quantity: {coin.quantity.toFixed(4)}</Typography></Grid>
      <Grid item xs={6}><Typography>Price: {coin.price.toFixed(8)}</Typography></Grid>
      <Grid item xs={6}>
        <Typography>
          Increase: <span style={{ color: coin.increase < 0 ? 'red' : 'white' }}>{coin.increase}</span>
        </Typography>
      </Grid>
    </Grid>
    <Button variant="contained" sx={{ mt: 1 }}>Cycle</Button>
  </Paper>
);

// Sections
const AllSection = () => (
  <Box>{initialCoins.map((coin, index) => <TradeCard key={index} coin={coin} />)}</Box>
);

const CircleSection = () => (
  <Box>
    {initialCoins.map((coin, index) => (
      <Paper key={index} sx={{ p: 2, mt: 2, background: 'linear-gradient(to bottom, #1976d2, #337da5)', color: 'white', borderRadius: 2 }}>
        <Typography variant="h6">{coin.symbol} - Circle</Typography>
        <Typography>Special Circle Mode Active</Typography>
        <TradeCard coin={coin} />
      </Paper>
    ))}
  </Box>
);

const OneShotSection = () => (
  <Box>
    {initialCoins.map((coin, index) => (
      <Paper key={index} sx={{ p: 2, mt: 2, background: 'linear-gradient(to bottom, #1976d2, #337da5)', color: 'white', borderRadius: 2 }}>
        <Typography variant="h6">{coin.symbol} - One Shot</Typography>
        <Typography>One-Time Trade Execution</Typography>
        <TradeCard coin={coin} />
      </Paper>
    ))}
  </Box>
);

const StopMarginCallSection = () => (
  <Box>
    {initialCoins.map((coin, index) => (
      <Paper key={index} sx={{ p: 2, mt: 2, background: 'linear-gradient(to bottom, #1976d2, #337da5)', color: 'white', borderRadius: 2 }}>
        <Typography variant="h6">{coin.symbol} - Stop Margin Call</Typography>
        <Typography>Risk Management Activated</Typography>
        <TradeCard coin={coin} />
      </Paper>
    ))}
  </Box>
);

// Main Trading Page
const TradingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');   
  const [searchTab, setSearchTab] = useState(0);
  const searchTabs = ['All', 'Circle', 'One Shot', 'Stop Margin Call'];

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
        <TextField 
          fullWidth 
          variant="outlined" 
          placeholder="Type to search..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          sx={{ mt: 1 }}
        />
        <Tabs value={searchTab} onChange={(e, newValue) => setSearchTab(newValue)} variant="scrollable" scrollButtons="auto">
          {searchTabs.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>
      </Paper>

      {/* Render Sections Based on Tab */}
      <Box sx={{ p: 2 }}>
        {searchTab === 0 && <AllSection />}
        {searchTab === 1 && <CircleSection />}
        {searchTab === 2 && <OneShotSection />}
        {searchTab === 3 && <StopMarginCallSection />}
      </Box>

      {/* Bottom Navigation */}
      <Paper sx={{ position: 'fixed', bottom: 0, width: '100%', p: 2, textAlign: 'center', background: 'linear-gradient(to bottom, green, #337da5)' }}>
        <Typography>Binance Balance: 0.0000</Typography>
      </Paper>
    </Box>
  );
};

export default TradingPage;
