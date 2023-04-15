import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import { styled, createTheme } from "@mui/system";
import iconWide from "../assets/icon_wide.png";
import { getTokenBalance } from "../actions/contractActions";

const StyledAppBar = styled(AppBar)(() => ({}));

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
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
