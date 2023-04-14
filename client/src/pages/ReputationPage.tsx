import { Typography, TextField, Button } from "@mui/material";
import React from "react";
import Header from "../components/Header";

const ReputationPage = (to="") => {
  return (
    <>
      <Header />
      <main>
        <div>
          <Typography>
            To
          </Typography>
          <TextField />
        </div>
        <div>
          <Typography>
            Good
          </Typography>
          <TextField />
        </div>
        <div>
          <Typography>
            More
          </Typography>
          <TextField />
        </div>
        <Button>Submit</Button>
      </main>
    </>
  )
}

export default ReputationPage;