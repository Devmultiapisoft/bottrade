import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, useTheme } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorNotifications = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>Error Notifications</Typography>
      <List>
        {[1,2,3].map((item) => (
          <ListItem key={item} sx={{ backgroundColor: theme.palette.error.light, mb: 1 }}>
            <ErrorIcon sx={{ mr: 2 }} />
            <ListItemText
              primary="Error Message"
              secondary="2023-09-20 14:30:00 - Transaction failed"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ErrorNotifications;