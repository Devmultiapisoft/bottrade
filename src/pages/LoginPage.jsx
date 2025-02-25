// LoginPage.js
import React from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';

const LoginPage = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <Paper style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
          Login
        </Button>
      </Paper>
    </div>
  );
};

export default LoginPage;
