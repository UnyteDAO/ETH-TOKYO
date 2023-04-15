import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { styled, createTheme } from "@mui/system";
import iconWide from "../assets/icon_wide.png";
import MenuIcon from "@mui/icons-material/Menu";

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

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        setWalletAddress(res[0]);
      });
    }
  });

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button onClick={() => navigate("/")}>
            <img
              src={iconWide}
              alt="Unyte"
              style={{ height: "32px", width: "auto" }}
            />
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
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ ml: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
