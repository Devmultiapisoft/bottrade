import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Select, FormControl, InputLabel, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon, AccountCircle as UserIcon, Language as LanguageIcon, Menu as MenuIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Navbar = ({ darkMode, setDarkMode }) => {
  const [language, setLanguage] = useState('en');
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Trade', path: '/Trade' },
    { text: 'Markets', path: '/market' },
    { text: 'Futures', path: '/futures' },
    { text: 'Earn', path: '/earn' },
  ];

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <IconButton color="inherit" sx={{ display: { xs: 'block', md: 'none' } }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          {!isMobile && (
          <Typography component={NavLink} to="/" variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            TRADEBOT
          </Typography>
            )}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              {menuItems.map((item) => (
                <Button key={item.text} color="inherit" component={NavLink} to={item.path}>
                  {item.text}
                </Button>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel><LanguageIcon fontSize="small" /></InputLabel>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                label="Language"
                sx={{ height: '40px' }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Español</MenuItem>
              </Select>
            </FormControl>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <UserIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={NavLink} to="/login" onClick={handleMenuClose}>Login</MenuItem>
              <MenuItem component={NavLink} to="/signup" onClick={handleMenuClose}>Sign Up</MenuItem>
              <MenuItem component={NavLink} to="/profile" onClick={handleMenuClose}>Me</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </StyledAppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={NavLink} to={item.path} onClick={toggleDrawer(false)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;