import { Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";

const SeeingReputation = (data) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    setSearchTerm(searchTerm);
    setSearchResults(data.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />
      {searchTerm && <SearchResult data={searchResults} />}
    </>
  )
}

export default SeeingReputation;