// reactとuseEffectのインポート
import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  InputAdornment,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Button,
  Checkbox,
} from "@mui/material";
import { ListWrapper, ListContent } from "../styled/styledComps";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate } from "react-router-dom";

interface Data {
  id: number;
  name: string;
}

const data: Data[] = Array(10)
  .fill(0)
  .map((_, index) => ({
    id: index,
    name: `Item ${index + 1}`,
  }));

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const DaoWorker = () => {
  const [content, setContent] = useState([{
    id: 0,
    name: `name`,
  }]);

  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Search clicked");
  };
  const handleButtonClick = (itemId: number) => {
    navigate(`/recruiter/${itemId}`);
  };

  return (
    <ListWrapper>
      <ListContent>
        <Box sx={{ width: "100%" }}>
          <List>
            {content.map((item) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick(item.id)}>
                    Tips
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      </ListContent>
    </ListWrapper>
  );
};

export default DaoWorker;
