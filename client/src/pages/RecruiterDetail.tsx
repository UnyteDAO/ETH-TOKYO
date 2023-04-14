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
import { ListWrapperNoP, ListContent, Ucol, Urow } from "../styled/styledComps";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <Ucol>
                  <Urow>
                    <p>Good: </p>
                    <p>{item.name}</p>
                  </Urow>
                  <Urow>
                    <p>More: </p>
                    <p>{item.name}</p>
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
