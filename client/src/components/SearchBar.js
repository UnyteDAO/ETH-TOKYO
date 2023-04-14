import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Paper component="form" onSubmit={handleSearch} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="検索キーワードを入力"
        inputProps={{ 'aria-label': 'search' }}
        value={searchTerm}
        onChange={handleInputChange}
      />
    </Paper>
  );
};

export default SearchBar;