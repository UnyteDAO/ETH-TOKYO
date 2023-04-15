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
        <Grid container justifyContent="center" alignItems="center" spacing={2} marginBottom={2}>
          <Grid item>
            <Typography variant="h5">To</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" spacing={2} marginBottom={2}>
          <Grid item>
            <Typography variant="h5">Good</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth multiline rows={2} />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5">More</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth multiline rows={2} />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }} alignItems="flex-end">
          <Button variant="contained" size="large">Submit</Button>
        </Box>
      </Box>
    </main>
  );
};

export default Reviewer;
