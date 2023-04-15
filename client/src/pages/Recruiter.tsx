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
import { ListWrapper, ListContent, ReviewerInput } from "../styled/styledComps";
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
const [searchWord, setSearchWord] = useState("")


  const handleOpenPopup = (itemId: number) => {
    setIsPopupOpen(true);
    
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSearch = () => {
    console.log("Search clicked");
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
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
              },
            }}
            value={searchWord}
            onChange={(e) => {setSearchWord(e.target.value)}}
          />
        </Box>
        <Box>
          <List>
            {data.map((item) => (
              <>
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
              <DecryptoPopup
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                title="Sample Popup">
                <p>購入して詳細画面に進みますか？</p>
                <Button onClick={() => {navigate(`/recruiter/${item.id}`)}}>はい</Button>
                <Button onClick={() => {setIsPopupOpen(false)}}>いいえ</Button>
              </DecryptoPopup>
              </>
            ))}
          </List>
        </Box>
      </ListContent>
    </ListWrapper>
  );
};

export default Recruiter;
