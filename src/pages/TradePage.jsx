import React, { useEffect, useState } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Tabs,
  Tab,
  Box
} from '@mui/material';
import ThreeDChart from '../components/ThreeDChart';

// Dummy data for demonstration
const initialCoins = [
  { symbol: 'BTCUSDT', price: 42000, change: 2.5 },
  { symbol: 'ETHUSDT', price: 3000, change: -1.2 },
  { symbol: 'BNBUSDT', price: 350, change: 0.8 },
  { symbol: 'XRPUSDT', price: 0.52, change: 0.3 },
  { symbol: 'SOLUSDT', price: 98, change: 5.1 },
  { symbol: 'ADAUSDT', price: 0.48, change: -0.7 },
  { symbol: 'DOTUSDT', price: 8.2, change: 1.9 },
  { symbol: 'DOGEUSDT', price: 0.08, change: 0.2 },
  { symbol: 'LTCUSDT', price: 72, change: -0.4 },
  { symbol: 'UNIUSDT', price: 6.3, change: 2.1 }
];

const TradePage = () => {
  const [coins] = useState(initialCoins);
  const [selectedCoin, setSelectedCoin] = useState('BTCUSDT');
  const [orderType, setOrderType] = useState('market');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState(42000);
  const [marginLevel, setMarginLevel] = useState(15.2);
  const [leverage, setLeverage] = useState(10);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Order book dummy data
  const orderBook = {
    bids: [
      { price: 41950, amount: 0.5 },
      { price: 41900, amount: 1.2 },
    ],
    asks: [
      { price: 42050, amount: 0.8 },
      { price: 42100, amount: 1.5 },
    ],
  };

  const handleBuy = () => {
    console.log(`Buy ${amount} ${selectedCoin} at ${price}`);
    // Add actual buy logic here
  };

  const handleSell = () => {
    console.log(`Sell ${amount} ${selectedCoin} at ${price}`);
    // Add actual sell logic here
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Margin Trading</Typography>
      
      <Grid container spacing={3}>
        {/* Left Column: Chart and Order Book */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 3, height: 500 }}>
            <ThreeDChart selectedCoin={selectedCoin} />
          </Paper>
          
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Order Book</Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {orderBook.asks.reverse().map((ask, index) => (
                    <TableRow key={`ask-${index}`} sx={{ bgcolor: '#fff5f5' }}>
                      <TableCell>{ask.price.toFixed(1)}</TableCell>
                      <TableCell>{ask.amount.toFixed(3)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                    <TableCell colSpan={2} align="center">
                      {price.toFixed(1)} USDT
                    </TableCell>
                  </TableRow>
                  {orderBook.bids.map((bid, index) => (
                    <TableRow key={`bid-${index}`} sx={{ bgcolor: '#f0fff4' }}>
                      <TableCell>{bid.price.toFixed(1)}</TableCell>
                      <TableCell>{bid.amount.toFixed(3)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Right Column: Trading Panel */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Margin Status</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2">Margin Level:</Typography>
                <Typography variant="body1" color={marginLevel > 10 ? 'success.main' : 'error.main'}>
                  {marginLevel}x
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Leverage:</Typography>
                <Select
                  value={leverage}
                  onChange={(e) => setLeverage(e.target.value)}
                  size="small"
                  fullWidth
                >
                  {[5, 10, 20, 50, 100].map((lev) => (
                    <MenuItem key={lev} value={lev}>{lev}x</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Buy" />
              <Tab label="Sell" />
            </Tabs>

            <Box sx={{ mt: 2 }}>
              <Select
                fullWidth
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                sx={{ mb: 2 }}
              >
                {coins.map((coin) => (
                  <MenuItem key={coin.symbol} value={coin.symbol}>
                    {coin.symbol} ({coin.change > 0 ? '+' : ''}{coin.change}%)
                  </MenuItem>
                ))}
              </Select>

              <Select
                fullWidth
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                sx={{ mb: 2 }}
              >
                <MenuItem value="market">Market Order</MenuItem>
                <MenuItem value="limit">Limit Order</MenuItem>
                <MenuItem value="stop">Stop Order</MenuItem>
              </Select>

              {orderType !== 'market' && (
                <TextField
                  fullWidth
                  label="Price (USDT)"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  sx={{ mb: 2 }}
                />
              )}

              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Button 
                fullWidth 
                variant="contained" 
                color={tabValue === 0 ? 'success' : 'error'}
                onClick={tabValue === 0 ? handleBuy : handleSell}
              >
                {tabValue === 0 ? 'Buy' : 'Sell'} {selectedCoin}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TradePage;