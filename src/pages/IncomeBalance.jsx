import React, { useState } from 'react';
  import {
    Box,
    Typography,
    Grid,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    useTheme,
  } from '@mui/material';

  const IncomeBalance = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);

    const actions = [
      { title: 'Deposit', color: 'success' },
      { title: 'Withdrawal', color: 'error' },
      { title: 'Swap', color: 'warning' },
      { title: 'Transfer', color: 'info' },
    ];

    const handleOpen = (action) => {
      setSelectedAction(action);
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      setSelectedAction(null);
    };

    return (
      <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom>Income Balance</Typography>

        <Grid container spacing={3}>
          {actions.map((action) => (
            <Grid item xs={12} sm={6} md={3} key={action.title}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color={action.color}
                  fullWidth
                  onClick={() => handleOpen(action.title)}
                >
                  {action.title}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedAction}</DialogTitle>
          <DialogContent>
            {selectedAction === 'Deposit' && (
              <Box>
                <Typography variant="body1" gutterBottom>Deposit via QR Code or fill the form below:</Typography>
                <TextField fullWidth label="Amount" variant="outlined" sx={{ mb: 2 }} />
                {/* QR Code placeholder */}
                <Box sx={{ width: '100%', height: 150, backgroundColor: '#f0f0f0', mb: 2, textAlign: 'center', lineHeight: '150px' }}>
                  QR Code
                </Box>
              </Box>
            )}
            {selectedAction === 'Withdrawal' && (
              <Box>
                <Typography variant="body1" gutterBottom>Fill the form to withdraw:</Typography>
                <TextField fullWidth label="Amount" variant="outlined" sx={{ mb: 2 }} />
                <TextField fullWidth label="Account Number" variant="outlined" sx={{ mb: 2 }} />
              </Box>
            )}
            {selectedAction === 'Swap' && (
              <Box>
                <Typography variant="body1" gutterBottom>Fill the form to swap:</Typography>
                <TextField fullWidth label="From Currency" variant="outlined" sx={{ mb: 2 }} />
                <TextField fullWidth label="To Currency" variant="outlined" sx={{ mb: 2 }} />
                <TextField fullWidth label="Amount" variant="outlined" sx={{ mb: 2 }} />
              </Box>
            )}
            {selectedAction === 'Transfer' && (
              <Box>
                <Typography variant="body1" gutterBottom>Fill the form to transfer:</Typography>
                <TextField fullWidth label="Recipient" variant="outlined" sx={{ mb: 2 }} />
                <TextField fullWidth label="Amount" variant="outlined" sx={{ mb: 2 }} />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color="primary">Submit</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };

  export default IncomeBalance;