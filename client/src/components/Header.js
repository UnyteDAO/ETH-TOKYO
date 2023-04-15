import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import iconWide from "../assets/icon_wide.png";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, createTheme } from "@mui/system";
import { getTokenBalance } from "../actions/contractActions";

const StyledAppBar = styled(AppBar)(() => ({
  position: "sticky",
  top: 0,
}));

const Header = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);

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
    const fetchData = async () => {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => {
            setWalletAddress(res[0]);
          });
      }
      try {
        const res = await getTokenBalance();
        setBalance(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <StyledAppBar position="fixed">
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
            <Tooltip
              title={
                <Typography
                  variant="body1"
                  // component="span"
                  sx={{ fontSize: "2rem" }}>
                  {parseInt(balance * 18)} UNYT
                </Typography>
              }
              open
              arrow>
              <Typography>{walletAddress}</Typography>
            </Tooltip>
          )}
          <IconButton edge="end" color="inherit" aria-label="menu" sx={{ ml: 2 }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      <Box sx={{ paddingTop: "64px" }} /> {/* ヘッダー下のスペースを確保 */}
    </>
  );
};

export default Header;
