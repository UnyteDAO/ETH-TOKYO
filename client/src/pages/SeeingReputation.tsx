import { Typography } from "@mui/material";
import React from "react";
import Header from "../components/Header";

const SeeingReputation = (assessments) => {
  return (
    <>
      <Header />
      <SearchBar />
      {/* <div className="index">
        {assessments.map((aasessment) => {
          return (
            <>
              <Typography>
                {aasessment.name}
              </Typography>
              <Typography>
                {aasessment.content}
              </Typography>
            </>
          )
        })}
      </div> */}
    </>
  )
}

export default SeeingReputation;