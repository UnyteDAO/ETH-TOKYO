import React from "react";
import {
  TextField,
  Box,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
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
    more: "more",
  }));

const Recruiter = () => {
  const { itemId } = useParams();

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Address: {itemId}
        </Typography>
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <ListItem>
                  <ListItemAvatar sx={{ mr: 2 }}>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                </ListItem>
                <Box>
                  <TextField
                    fullWidth
                    disabled
                    label="Good"
                    value={item.good}
                    sx={{ my: 1 }}
                  />
                  <TextField
                    fullWidth
                    disabled
                    label="More"
                    value={item.more}
                    sx={{ my: 1 }}
                  />
                </Box>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick(item.id)}
                  >
                    View Details
                  </Button> */}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Recruiter;
