import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Avatar,
  Stack,
  LinearProgress,
  Button,
  Grid,
} from '@mui/material';
import {
  AccountBalanceWallet,
  ShowChart,
  Paid,
  AccountTree,
  SwapHoriz,
  Api,
  MonetizationOn,
  VideoLibrary,
  GroupAdd,
} from '@mui/icons-material';
import ThreeDChart from '../components/ThreeDChart';
import { PieChart, Pie, Cell } from 'recharts';

// Dummy data
const portfolio = {
  totalBalance: 63450.80,
  available: 28450.20,
  inOrders: 35000.60,
  change24h: +2.4,
};

const assetDistribution = [
  { name: 'BTC', value: 45, color: '#f7931a' },
  { name: 'ETH', value: 30, color: '#627eea' },
  { name: 'USDT', value: 25, color: '#26a17b' },
];

const marketMovers = [
  { symbol: 'BTC/USDT', price: 42000, change: +3.2 },
  { symbol: 'ETH/USDT', price: 3000, change: -1.5 },
  { symbol: 'BNB/USDT', price: 350, change: +0.8 },
];

const transactions = [
  { id: 1, type: 'Buy', asset: 'BTC', amount: 0.5, date: '2023-10-01' },
  { id: 2, type: 'Sell', asset: 'ETH', amount: 1.2, date: '2023-10-02' },
];

const DashboardPage = () => {
    const [selectedCoin, setSelectedCoin] = useState('BTCUSDT');
  return (
    <Box sx={{ p: 3 }}>
      {/* Top Row: Portfolio Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <AccountBalanceWallet sx={{ fontSize: 40 }} />
              <div>
                <Typography variant="h6">Total Balance</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  ${portfolio.totalBalance.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  color={portfolio.change24h >= 0 ? 'success.main' : 'error.main'}
                >
                  {portfolio.change24h >= 0 ? '+' : ''}{portfolio.change24h}% (24h)
                </Typography>
              </div>
            </Stack>

            <Stack spacing={1}>
              <LinearProgress
                variant="determinate"
                value={(portfolio.available / portfolio.totalBalance) * 100}
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Available: ${portfolio.available.toLocaleString()}</Typography>
                <Typography variant="body2">In Orders: ${portfolio.inOrders.toLocaleString()}</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        {/* Asset Distribution Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              <AccountTree sx={{ mr: 1 }} />
              Asset Distribution
            </Typography>
            <PieChart width={200} height={200}>
              <Pie
                data={assetDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {assetDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <Stack spacing={1} sx={{ mt: 2 }}>
              {assetDistribution.map((asset) => (
                <Stack key={asset.name} direction="row" alignItems="center" spacing={1}>
                  <Avatar sx={{ bgcolor: asset.color, width: 24, height: 24 }} />
                  <Typography>{asset.name}: {asset.value}%</Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              <SwapHoriz sx={{ mr: 1 }} />
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {['Deposit', 'Withdraw', 'Trade'].map((action) => (
                <Grid item xs={12} key={action}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<Paid />}
                  >
                    {action}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Market Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Main Chart */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography selectedCoin={selectedCoin} variant="h6" gutterBottom>
              <ShowChart sx={{ mr: 1 }} />
              BTC/USDT Price Chart
            </Typography>
            <ThreeDChart selectedCoin={selectedCoin} />
          </Paper>
        </Grid>

        {/* Market Movers */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Market Movers (24h)
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Pair</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Change</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {marketMovers.map((mover) => (
                    <TableRow key={mover.symbol}>
                      <TableCell>{mover.symbol}</TableCell>
                      <TableCell>${mover.price.toLocaleString()}</TableCell>
                      <TableCell sx={{
                        color: mover.change >= 0 ? 'success.main' : 'error.main',
                        fontWeight: 'bold'
                      }}>
                        {mover.change >= 0 ? '+' : ''}{mover.change}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Additional Sections */}
      <Grid container spacing={3}>
        {/* API Binding */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Api sx={{ mr: 1 }} />
              API Binding
            </Typography>
            <Button variant="contained" color="secondary" fullWidth>
              Connect API
            </Button>
          </Paper>
        </Grid>

        {/* Revenue Details */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <MonetizationOn sx={{ mr: 1 }} />
              Revenue Details
            </Typography>
            <Typography variant="body2">Total Revenue: $12,345.67</Typography>
            <Typography variant="body2">Monthly Growth: +5%</Typography>
          </Paper>
        </Grid>

        {/* Transactions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Transactions
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Asset</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.asset}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Videos */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <VideoLibrary sx={{ mr: 1 }} />
              Videos
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              Watch Tutorials
            </Button>
          </Paper>
        </Grid>

        {/* Reward Details */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <MonetizationOn sx={{ mr: 1 }} />
              Reward Details
            </Typography>
            <Typography variant="body2">Total Rewards: $500</Typography>
            <Typography variant="body2">Pending Rewards: $100</Typography>
          </Paper>
        </Grid>

        {/* Invite Friends */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <GroupAdd sx={{ mr: 1 }} />
              Invite Friends
            </Typography>
            <Button variant="contained" color="success" fullWidth>
              Refer a Friend
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;