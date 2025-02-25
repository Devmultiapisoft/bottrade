import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  TableSortLabel,
  TablePagination,
  CircularProgress,
} from '@mui/material';

const MarketsPage = () => {
  const [markets, setMarkets] = useState([]);
  const [orderBy, setOrderBy] = useState('volume');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        if (!response.ok) throw new Error('Failed to fetch market data');
        const data = await response.json();
        const formattedData = data.map((item) => ({
          pair: item.symbol,
          price: parseFloat(item.lastPrice),
          change: parseFloat(item.priceChangePercent),
          high24h: parseFloat(item.highPrice),
          low24h: parseFloat(item.lowPrice),
          volume: parseFloat(item.volume),
          icon: `https://cryptologos.cc/logos/${item.symbol.toLowerCase()}-logo.png`,
        }));
        setMarkets(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedMarkets = markets.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] - b[orderBy];
    }
    return b[orderBy] - a[orderBy];
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#131722',
      minHeight: '100vh',
      color: 'white'
    }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'white', mb: 3 }}>
        Markets
      </Typography>

      {loading ? (
        <CircularProgress color="inherit" />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: '#1a1e2c',
            borderRadius: '8px',
            boxShadow: 'none'
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="markets table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#6b7280!important', borderColor: '#2d2d2d' }}>
                  <TableSortLabel
                    active={orderBy === 'pair'}
                    direction={orderBy === 'pair' ? order : 'asc'}
                    onClick={() => handleSort('pair')}
                  >
                    Pair
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" sx={{ color: '#6b7280!important', borderColor: '#2d2d2d' }}>
                  <TableSortLabel
                    active={orderBy === 'price'}
                    direction={orderBy === 'price' ? order : 'asc'}
                    onClick={() => handleSort('price')}
                  >
                    Price (USDT)
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" sx={{ color: '#6b7280!important', borderColor: '#2d2d2d' }}>
                  <TableSortLabel
                    active={orderBy === 'change'}
                    direction={orderBy === 'change' ? order : 'asc'}
                    onClick={() => handleSort('change')}
                  >
                    24h Change
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" sx={{ color: '#6b7280!important', borderColor: '#2d2d2d' }}>
                  <TableSortLabel
                    active={orderBy === 'high24h'}
                    direction={orderBy === 'high24h' ? order : 'asc'}
                    onClick={() => handleSort('high24h')}
                  >
                    24h High
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" sx={{ color: '#6b7280!important', borderColor: '#2d2d2d' }}>
                  <TableSortLabel
                    active={orderBy === 'low24h'}
                    direction={orderBy === 'low24h' ? order : 'asc'}
                    onClick={() => handleSort('low24h')}
                  >
                    24h Low
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" sx={{ color: '#6b7280!important', borderColor: '#2d2d2d' }}>
                  <TableSortLabel
                    active={orderBy === 'volume'}
                    direction={orderBy === 'volume' ? order : 'asc'}
                    onClick={() => handleSort('volume')}
                  >
                    24h Volume
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedMarkets
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((market, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:hover': { backgroundColor: '#252a39' },
                      borderColor: '#2d2d2d'
                    }}
                  >
                    <TableCell sx={{ color: 'white', borderColor: '#2d2d2d' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Avatar
                          src={market.icon}
                          sx={{ width: 24, height: 24 }}
                        />
                        {market.pair}
                      </div>
                    </TableCell>
                    <TableCell align="right" sx={{
                      color: market.price > 100 ? '#00ff5f' : 'white',
                      borderColor: '#2d2d2d'
                    }}>
                      ${market.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell align="right" sx={{
                      color: market.change >= 0 ? '#00ff5f' : '#ff0000',
                      borderColor: '#2d2d2d'
                    }}>
                      {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right" sx={{ color: 'white', borderColor: '#2d2d2d' }}>
                      ${market.high24h.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell align="right" sx={{ color: 'white', borderColor: '#2d2d2d' }}>
                      ${market.low24h.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell align="right" sx={{ color: 'white', borderColor: '#2d2d2d' }}>
                      ${market.volume.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[30, 50, 100]}
            component="div"
            count={markets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              color: 'white',
              borderTop: '1px solid #2d2d2d',
              '& .MuiTablePagination-selectIcon': {
                color: 'white'
              }
            }}
          />
        </TableContainer>
      )}
    </div>
  );
};

export default MarketsPage;