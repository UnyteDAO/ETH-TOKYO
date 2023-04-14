import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardMedia, CardActionArea, Box } from '@mui/material';
import { styled, createTheme } from '@mui/system';

const theme = createTheme();

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const Header = () => {
  const navigate = useNavigate();

  return (
    <StyledAppBar position="static">
    <Toolbar>
      <Box sx={{ flexGrow: 1 }}>
        <Button onClick={() => navigate("/")} color="inherit" sx={{ textTransform: 'none' }}>
          <Typography variant="h6">
            Unyte
          </Typography>
        </Button>
      </Box>
    </Toolbar>
  </StyledAppBar>
  )
}

export default Header;