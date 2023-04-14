import React from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ListWrapper, ListContent } from "../styled/styledComps";
import FolderIcon from "@mui/icons-material/Folder";

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

const Recruiter = () => {
  const handleSearch = () => {
    console.log("Search clicked");
  };
  const handleButtonClick = (itemId: number) => {
    console.log(`Button clicked for item ${itemId}`);
  };

  return (
    <ListWrapper>
      <ListContent>
        <Box>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch} edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box>
          <List>
            {data.map((item) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick(item.id)}>
                    Click me
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

export default Recruiter;
