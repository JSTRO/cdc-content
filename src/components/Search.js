import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { IconButton, InputBase, Paper } from '@material-ui/core'

function Search({ search, setSearch }) {

  const handleSearch = event => {
    const { value } = event.target
    setSearch(value)
  }

  return (
    <Paper className="search">
      <IconButton
        type="submit"
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Search…"
        name="search"
        value={search}
        onChange={handleSearch}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Paper>
  )
}

export default Search