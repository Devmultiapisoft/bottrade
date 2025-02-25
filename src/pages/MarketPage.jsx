import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const MarketsPage = () => {
  // Dummy data
  const markets = [
    { pair: 'BTC/USDT', price: 42000, change: '+2.5%' },
    { pair: 'ETH/USDT', price: 3000, change: '-1.2%' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>Markets</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pair</TableCell>
              <TableCell>Price (USDT)</TableCell>
              <TableCell>24h Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {markets.map((market, index) => (
              <TableRow key={index}>
                <TableCell>{market.pair}</TableCell>
                <TableCell>${market.price.toLocaleString()}</TableCell>
                <TableCell style={{ color: market.change.startsWith('+') ? 'green' : 'red' }}>
                  {market.change}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MarketsPage;