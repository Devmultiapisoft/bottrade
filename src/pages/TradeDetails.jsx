import React from "react";
import { Box, Typography, Grid, Card, Chip, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { CurrencyExchange, ShowChart, PauseCircle, ShoppingCart, Cancel } from "@mui/icons-material";

const TradeDetails = () => {
  const { symbol } = useParams();

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" sx={{ color: "#ff9800" }}>Binance</Typography>
        <Typography variant="h6" sx={{ color: "#f44336" }}>Transaction Record</Typography>
      </Box>
      
      <Card sx={{ p: 2, mb: 2, bgcolor: "#fff" }}>
        <Chip label="Whole Warehouse Mode" sx={{ bgcolor: "#d3d3d3", color: "#000" }} />
        <Typography variant="h6" mt={1} sx={{ color: "#ff9800" }}>{symbol}</Typography>
        
        <Grid container spacing={2} mt={1}>
          <Grid item xs={4}><Typography>Position Amt(USDT)</Typography><Typography sx={{ color: "#f44336" }}>0.0000</Typography></Grid>
          <Grid item xs={4}><Typography>AVG Price</Typography><Typography sx={{ color: "#f44336" }}>0.0000</Typography></Grid>
          <Grid item xs={4}><Typography>Number of call margin</Typography><Typography sx={{ color: "#f44336" }}>0</Typography></Grid>
          <Grid item xs={4}><Typography>Position qty({symbol})</Typography><Typography sx={{ color: "#f44336" }}>0.0</Typography></Grid>
          <Grid item xs={4}><Typography>Current Price</Typography><Typography sx={{ color: "#f44336" }}>0.000000000</Typography></Grid>
          <Grid item xs={4}><Typography>Floating Profit/Loss</Typography><Typography sx={{ color: "green" }}>0.000 $</Typography></Grid>
        </Grid>
      </Card>
      
      <Card sx={{ p: 2, mb: 2, bgcolor: "#fff" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={4} textAlign="center"><CurrencyExchange fontSize="large" sx={{ color: "#ff9800" }} /><Typography>Cycle</Typography></Grid>
          <Grid item xs={4} textAlign="center"><ShoppingCart fontSize="large" sx={{ color: "#ff9800" }} /><Typography>Buy</Typography></Grid>
          <Grid item xs={4} textAlign="center"><PauseCircle fontSize="large" sx={{ color: "#ff9800" }} /><Typography>Stop Margin Call</Typography></Grid>
          <Grid item xs={4} textAlign="center"><CurrencyExchange fontSize="large" sx={{ color: "#ff9800" }} /><Typography>Sell</Typography></Grid>
          <Grid item xs={4} textAlign="center"><ShowChart fontSize="large" sx={{ color: "#ff9800" }} /><Typography>Chart</Typography></Grid>
          <Grid item xs={4} textAlign="center"><Cancel fontSize="large" color="error" /><Typography>Cancel Bot</Typography></Grid>
        </Grid>
      </Card>
      
      <Card sx={{ p: 2, mb: 2, bgcolor: "#fff" }}>
        <Typography variant="h6" sx={{ color: "#ff9800" }}>Operation Reminder</Typography>
        <Typography variant="body2">
          Do not operate the BotTrade App and the Exchange account at the same time. Verify fixed deposit,
          freezing, enable Reading, enable Spot & Margin Trading and other related settings to prevent system errors.
        </Typography>
      </Card>
      
      <Card sx={{ p: 2, mb: 2, bgcolor: "#fff" }}>
        <Typography>Call Margin Trigger Price &lt; <span style={{ color: "green" }}>0.0000</span></Typography>
        <Typography>Take Profit Trigger Price &gt; <span style={{ color: "green" }}>0.0000</span></Typography>
      </Card>
      
      <Card sx={{ p: 2, mb: 2, bgcolor: "#fff" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}><Typography><ShowChart color="error" /> First Buy In Amount 12</Typography></Grid>
          <Grid item xs={6}><Typography><ShowChart color="warning" /> Margin Call In Limit 21</Typography></Grid>
          <Grid item xs={6}><Typography><ShowChart color="warning" /> Take Profit Ratio 1.5</Typography></Grid>
          <Grid item xs={6}><Typography><CurrencyExchange color="success" /> Earning Call Back 0.3</Typography></Grid>
          <Grid item xs={6}><Typography><ShowChart color="error" /> Margin Call Drop 3</Typography></Grid>
          <Grid item xs={6}><Typography><ShowChart color="info" /> Buy In Callback 0.5</Typography></Grid>
        </Grid>
      </Card>
      
      <Button variant="contained" fullWidth sx={{ bgcolor: "#ff9800", color: "white", fontSize: "1.2rem", p: 1.5 }}>Start</Button>
    </Box>
  );
};

export default TradeDetails;