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
  } from '@mui/material';

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
            <Paper
              sx={{
                p: 3,
                backgroundColor: theme.palette.background.paper,
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <Avatar
                alt="User Avatar"
                src="/api/placeholder/150/150"
                sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h6">John Doe</Typography>
              <Typography variant="body2" color="textSecondary">
                johndoe@example.com
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': { backgroundColor: theme.palette.primary.dark },
                }}
              >
                Edit Profile
              </Button>
            </Paper>
          </Grid>

          {/* Profile Details */}
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: theme.palette.background.paper,
                borderRadius: '8px',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Profile Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    defaultValue="John"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    defaultValue="Doe"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    defaultValue="johndoe@example.com"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    defaultValue="+1234567890"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      '&:hover': { backgroundColor: theme.palette.primary.dark },
                    }}
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };

  export default Profile;