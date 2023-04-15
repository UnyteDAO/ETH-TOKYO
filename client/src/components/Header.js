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
import { Link } from "react-router-dom";
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
          <Button component={Link} to="/" variant="text" color="secondary">
            Reviewer
          </Button>
          <Button
            component={Link}
            to="/dao-worker"
            variant="text"
            color="secondary">
            Dao Worker
          </Button>
          <Button
            component={Link}
            to="/recruiter"
            variant="text"
            color="secondary">
            Recruiter
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
                {balance ? parseFloat(balance).toFixed(1) : 0} UNYT {/* NaNを0に変更 */}
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
  );
};

export default Header;
