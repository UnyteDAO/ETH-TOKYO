import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled, createTheme } from '@mui/system';

const theme = createTheme();

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const Header = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(null);

  if (window.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' }).then((res) => {
      setWalletAddress(res[0]);
    });
  }

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button onClick={() => navigate("/")} color="inherit" sx={{ textTransform: 'none' }}>
            <Typography variant="h6">Unyte</Typography>
          </Button>
        </Box>
        {!walletAddress ? (
          <Button color="secondary">Connect to Metamask</Button>
        ) : (
          <Typography>{walletAddress}</Typography>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
