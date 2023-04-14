import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { styled, createTheme } from "@mui/system";

const StyledAppBar = styled(AppBar)(() => ({}));

const Header = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(null);

  const connectToMetamask = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        setWalletAddress(res[0]);
      });
    } else {
      alert("Metamaskがインストールされていません");
    }
  };

  // useEffect(() => {
  //   if (window.ethereum) {
  //     window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
  //       setWalletAddress(res[0]);
  //     });
  //   }
  // });

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            onClick={() => navigate("/")}
            color="inherit"
            sx={{ textTransform: "none" }}>
            <Typography variant="h6">Unyte</Typography>
          </Button>
        </Box>
        {!walletAddress ? (
          <Button
            onClick={() => {
              connectToMetamask();
            }}
            color="secondary">
            Connect to Metamask
          </Button>
        ) : (
          <Typography>{walletAddress}</Typography>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
