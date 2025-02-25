import React from 'react';
  import {
    Grid,
    Paper,
    Typography,
    Button,
    Avatar,
    Box,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
  } from '@mui/material';
  import {
    Lock as LockIcon,
    Savings as SavingsIcon,
    RocketLaunch as LaunchpadIcon,
    TrendingUp as LendingIcon,
  } from '@mui/icons-material';

  const EarnPage = () => {
    const theme = useTheme();
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
    };

    // Dummy data for staking products
    const stakingProducts = [
      {
        asset: 'BTC',
        apy: '5.2%',
        duration: '30 days',
        icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      },
      {
        asset: 'ETH',
        apy: '4.8%',
        duration: '60 days',
        icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      },
      {
        asset: 'BNB',
        apy: '6.5%',
        duration: '90 days',
        icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      },
    ];

    return (
      <Box
        sx={{
          p: 3,
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Earn
        </Typography>

        {/* Tabs for Earn Sections */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ mb: 4 }}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Staking" icon={<LockIcon />} />
          <Tab label="Savings" icon={<SavingsIcon />} />
          <Tab label="Launchpad" icon={<LaunchpadIcon />} />
          <Tab label="Lending" icon={<LendingIcon />} />
        </Tabs>

        {/* Staking Section */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            {stakingProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: '8px',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar src={product.icon} sx={{ width: 40, height: 40 }} />
                    <Typography variant="h6">{product.asset} Staking</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    APY: <strong>{product.apy}</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Duration: <strong>{product.duration}</strong>
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      '&:hover': { backgroundColor: theme.palette.primary.dark },
                    }}
                  >
                    Stake Now
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Savings Section */}
        {tabValue === 1 && (
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: '8px',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: theme.palette.text.secondary, borderColor: theme.palette.divider }}>
                    Asset
                  </TableCell>
                  <TableCell align="right" sx={{ color: theme.palette.text.secondary, borderColor: theme.palette.divider }}>
                    APY
                  </TableCell>
                  <TableCell align="right" sx={{ color: theme.palette.text.secondary, borderColor: theme.palette.divider }}>
                    Min Deposit
                  </TableCell>
                  <TableCell align="right" sx={{ color: theme.palette.text.secondary, borderColor: theme.palette.divider }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stakingProducts.map((product, index) => (
                  <TableRow key={index} sx={{ borderColor: theme.palette.divider }}>
                    <TableCell sx={{ color: theme.palette.text.primary, borderColor: theme.palette.divider }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={product.icon} sx={{ width: 24, height: 24 }} />
                        {product.asset}
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ color: theme.palette.text.primary, borderColor: theme.palette.divider }}>
                      {product.apy}
                    </TableCell>
                    <TableCell align="right" sx={{ color: theme.palette.text.primary, borderColor: theme.palette.divider }}>
                      0.001 {product.asset}
                    </TableCell>
                    <TableCell align="right" sx={{ borderColor: theme.palette.divider }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          '&:hover': { backgroundColor: theme.palette.primary.dark },
                        }}
                      >
                        Deposit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Launchpad Section */}
        {tabValue === 2 && (
          <Paper
            sx={{
              p: 3,
              backgroundColor: theme.palette.background.paper,
              borderRadius: '8px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Upcoming Launchpad Projects
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              No projects available at the moment. Check back later!
            </Typography>
          </Paper>
        )}

        {/* Lending Section */}
        {tabValue === 3 && (
          <Paper
            sx={{
              p: 3,
              backgroundColor: theme.palette.background.paper,
              borderRadius: '8px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Lending Opportunities
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              No lending opportunities available at the moment. Check back later!
            </Typography>
          </Paper>
        )}
      </Box>
    );
  };

  export default EarnPage;