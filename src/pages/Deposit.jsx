import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { QrCode } from "@mui/icons-material";
import { QRCodeCanvas } from "qrcode.react";

const Deposit = () => {
    const depositAddress = "TPaP2dYq4BxXkXw1cU2XjbT9kUZXsDnpFV"; // Replace with dynamic address if needed

  const theme = useTheme();
  const [transactionHash, setTransactionHash] = useState("");
  const [depositHistory, setDepositHistory] = useState([
    { date: "2025-02-20 14:30", amount: "500 USDT", status: "Completed" },
  ]);

  const handleDepositSubmit = () => {
    if (transactionHash) {
      setDepositHistory([
        { date: new Date().toLocaleString(), amount: "500 USDT", status: "Pending" },
        ...depositHistory,
      ]);
      setTransactionHash("");
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1A1A2E, #16213E)",
        color: "#FFF",
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: "bold", color: "#00E676" }}>
        Deposit USDT
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Deposit Balance */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: "15px",
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              color: "#FFF",
            }}
          >
            <Typography variant="h6" sx={{ color: "#FFD700" }}>Available Balance</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#00E676" }}>1000 USDT</Typography>
          </Paper>
        </Grid>

        {/* QR Code Section */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: "15px",
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              color: "#FFF",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: "#FFD700" }}>
              Scan QR Code
            </Typography>
            <QRCodeCanvas value={depositAddress} size={200} bgColor="transparent" fgColor="#FFD700" />

            <Typography variant="body2" sx={{ mt: 2 }}>Network: TRC20</Typography>
            <Typography variant="body2" sx={{ wordBreak: "break-word", mt: 1 }}>
              Address: {depositAddress}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Transaction Submission */}
      <Box mt={4} textAlign="center">
        <TextField
          variant="outlined"
          placeholder="Enter Transaction Hash"
          value={transactionHash}
          onChange={(e) => setTransactionHash(e.target.value)}
          sx={{ width: "50%", mr: 2, backgroundColor: "white", borderRadius: "5px" }}
        />
        <Button
          variant="contained"
          onClick={handleDepositSubmit}
          sx={{ backgroundColor: "#00E676", "&:hover": { backgroundColor: "#00C853" } }}
        >
          Submit
        </Button>
      </Box>

      {/* Deposit History */}
      <Box mt={4}>
        <Typography variant="h5" sx={{ mb: 2, color: "#FFD700" }}>
          Deposit History
        </Typography>
        <Paper sx={{ p: 3, borderRadius: "15px", background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}>
          {depositHistory.map((entry, index) => (
            <Paper
              key={index}
              sx={{
                p: 2,
                mb: 1,
                borderRadius: "10px",
                backgroundColor: entry.status === "Completed" ? "#00E676" : "#FFA726",
                color: "#FFF",
                textAlign: "center",
              }}
            >
              <Typography>{entry.date}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>{entry.amount} ({entry.status})</Typography>
            </Paper>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

export default Deposit;
