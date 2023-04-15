import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountBalanceWallet,
  AssignmentInd,
  Work,
} from "@mui/icons-material";
import { ReactNode } from "react";

const drawerWidth = 240;
interface ResponsiveDrawerProps {
  children: ReactNode;
}

const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawerContent = (
    <List>
      <ListItem
        style={{
          backgroundColor: "rgba(16, 187, 53, 0.24)",
          color: "rgb(16, 187, 53)",
          borderRadius: "4px",
        }}>
        <ListItemIcon>
          <AccountBalanceWallet />
        </ListItemIcon>
        <ListItemText primary="ウォレット接続" />
      </ListItem>
      <ListItem component={Link} to="/">
        <ListItemIcon>
          <AssignmentInd />
        </ListItemIcon>
        <ListItemText primary="Reviewer" />
      </ListItem>
      <ListItem component={Link} to="/dao-worker">
        <ListItemIcon>
          <Work />
        </ListItemIcon>
        <ListItemText primary="Dao Worker" />
      </ListItem>
      <ListItem component={Link} to="/recruiter">
        <ListItemIcon>
          <Work />
        </ListItemIcon>
        <ListItemText primary="Recruiter" />
      </ListItem>
    </List>
  );

  return (
    <>
      <div>
        <AppBar position="static">
          <Toolbar>
            {isMobile && (
              <IconButton color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap>
              ドロワーサンプル
            </Typography>
          </Toolbar>
        </AppBar>
        {isMobile ? (
          <Drawer anchor="left" open={open} onClose={handleDrawerToggle}>
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer variant="permanent" open>
            {drawerContent}
          </Drawer>
        )}
      </div>
      <main>{children}</main>
    </>
  );
};

export default ResponsiveDrawer;
