import React from "react";
import { List, Paper, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const SearchResult = ({ data }) => {
  return (
    <List>
      {data.map((item) => (
        <Link to={`/detail/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
          <Paper>
            <ListItem button>
              <ListItemText primary={item.title} />
            </ListItem>
          </Paper>
        </Link>
      ))}
    </List>
  );
};

export default SearchResult;