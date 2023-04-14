import React from "react";
import { List, Paper, ListItem, ListItemText, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ data }) => {
  const navigate =useNavigate()

  const handleClick = (item) => {
    navigate(`/details/${item.id}`, { state: item})
  }

  return (
    <List>
      {data.map((item) => (
        <Button onClick={() => {handleClick(item)}} key={item.id} style={{ textDecoration: 'none' }}>
          <Paper>
            <ListItem button>
              <ListItemText primary={item.title} />
            </ListItem>
          </Paper>
        </Button>
      ))}
    </List>
  );
};

export default SearchResult;