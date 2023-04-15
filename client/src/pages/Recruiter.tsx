import React, { useState } from "react";
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
import { ListWrapper, ListContent } from "../styled/styledComps";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate } from "react-router-dom";
import DecryptoPopup from "../components/DecryptoPopup";

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
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = (itemId: number) => {
    setIsPopupOpen(true);
    // handleButtonClick(itemId);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSearch = () => {
    console.log("Search clicked");
  };
  const handleButtonClick = (itemId: number) => {
    navigate(`/recruiter/${itemId}`);
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
                    onClick={() => handleOpenPopup(item.id)}>
                    Click me
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            <DecryptoPopup
              isOpen={isPopupOpen}
              onClose={handleClosePopup}
              title="Sample Popup">
              <p>This is a sample reusable popup component.</p>
            </DecryptoPopup>
          </List>
        </Box>
      </ListContent>
    </ListWrapper>
  );
};

export default Recruiter;
