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
import { ListWrapperNoP, ListContent, Ucol, Urow, TextForm } from "../styled/styledComps";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

interface Data {
  id: number;
  name: string;
  good: string;
  more: string;
}

const data: Data[] = Array(10)
  .fill(0)
  .map((_, index) => ({
    id: index,
    name: `Item ${index + 1}`,
    good: "good",
    more: "more"
  }));

const Recruiter = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Search clicked");
  };
  const handleButtonClick = (itemId: number) => {
    navigate(`/recruiter/${itemId}`);
  };

  return (
    <ListWrapperNoP>
      <ListContent>
        <p>Item ID: {itemId}</p>
        <Box>
          <List>
            {data.map((item, index) => (
              <ListItem key={item.id}>
                <ListItemAvatar sx={{ display: "flex", alignItems: "center"}}>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                  <p>{item.name}</p>
                </ListItemAvatar>
                <Ucol>
                  <Urow marginBottom={2}>
                    <p>Good: </p>
                    <TextForm fullWidth disabled={true} label={item.good} sx={{ m: 2}}/>
                  </Urow>
                  <Urow>
                    <p>More: </p>
                    <TextForm fullWidth disabled={true} label={item.more} sx={{ m: 2}}/>
                  </Urow>
                </Ucol>
              </ListItem>
            ))}
          </List>
        </Box>
      </ListContent>
    </ListWrapperNoP>
  );
};

export default Recruiter;
