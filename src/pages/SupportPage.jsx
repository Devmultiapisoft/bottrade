import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, Button, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SupportPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>Support Center</Typography>
      
      {/* FAQ Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>How to deposit funds?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Deposit instructions here...</Typography>
        </AccordionDetails>
      </Accordion>

      {/* Contact Form */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Contact Support</Typography>
        <TextField fullWidth label="Subject" sx={{ mb: 2 }} />
        <TextField fullWidth multiline rows={4} label="Message" sx={{ mb: 2 }} />
        <Button variant="contained">Submit</Button>
      </Paper>
    </Box>
  );
};

export default SupportPage;