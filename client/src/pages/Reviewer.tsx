import React from 'react';
import { Typography, TextField, Button, Box, Grid } from '@mui/material';

const Reviewer = () => {
  return (
    <main>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Grid container justifyContent="center" alignItems="flex-start" spacing={2}>
          <Grid item xs={8}>
            <Box sx={{ position: 'relative' }}>
              <Typography variant="h5" sx={{ position: 'absolute', top: '-30px', left: '0px' }}>
                To
              </Typography>
              <TextField fullWidth />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h5">Good</Typography>
            </Grid>
            <Grid item>
              <TextField />
            </Grid>
          </Grid>
        </Box>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5">More</Typography>
          </Grid>
          <Grid item>
            <TextField />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" size="large">Submit</Button>
        </Box>
      </Box>
    </main>
  );
};

export default Reviewer;
