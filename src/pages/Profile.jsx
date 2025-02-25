import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Button,
  useTheme,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const Profile = () => {
  const theme = useTheme();

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
        Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, backgroundColor: theme.palette.background.paper, borderRadius: '8px', textAlign: 'center' }}>
            <Avatar alt="User Avatar" src="/api/user/avatar" sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }} />
            <Typography variant="h6">John Doe</Typography>
            <Typography variant="body2" color="textSecondary">johndoe@example.com</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>Edit Profile</Button>
          </Paper>
        </Grid>

        {/* Profile Details & Settings */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, backgroundColor: theme.palette.background.paper, borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom>Profile Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField fullWidth label="First Name" defaultValue="John" variant="outlined" /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Last Name" defaultValue="Doe" variant="outlined" /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Email" defaultValue="johndoe@example.com" variant="outlined" /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Phone Number" defaultValue="+1234567890" variant="outlined" /></Grid>
              <Grid item xs={12}><Button variant="contained">Save Changes</Button></Grid>
            </Grid>
          </Paper>

          {/* Security Settings */}
          <Paper sx={{ p: 3, mt: 3, backgroundColor: theme.palette.background.paper, borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom><SecurityIcon sx={{ mr: 1 }} /> Security Settings</Typography>
            <FormControlLabel control={<Switch />} label="Enable Two-Factor Authentication (2FA)" sx={{ mb: 2 }} />
            <Button variant="contained">Change Password</Button>
          </Paper>

          {/* KYC Verification */}
          <Paper sx={{ p: 3, mt: 3, backgroundColor: theme.palette.background.paper, borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom><VerifiedUserIcon sx={{ mr: 1 }} /> KYC Verification</Typography>
            <Typography variant="body2" color="textSecondary">Status: Pending</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>Verify Now</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
