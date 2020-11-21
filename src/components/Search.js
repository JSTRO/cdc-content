import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import searchStyles from '../styles/searchStyles'

function Search({search, setSearch}) {
  const classes = searchStyles()

  const handleSearch = (event) => {
    const { value } = event.target
    setSearch(value)
  }

  return (
    <Paper className={classes.search}>
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Search…"
        name="search"
        value={search}
        onChange={handleSearch}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Paper>
  )
}

export default Search