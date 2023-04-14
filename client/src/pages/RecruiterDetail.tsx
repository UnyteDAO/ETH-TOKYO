import { Typography, TextField, Button } from "@mui/material";
import React from "react";

const RecruiterDetail = (to = "") => {
  return (
    <main>
      <div>
        <Typography>To</Typography>
        <TextField />
      </div>
      <div>
        <Typography>Good</Typography>
        <TextField />
      </div>
      <div>
        <Typography>More</Typography>
        <TextField />
      </div>
      <Button>Submit</Button>
    </main>
  );
};

export default RecruiterDetail;
