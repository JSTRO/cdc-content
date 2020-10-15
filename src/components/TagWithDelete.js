import React from 'react'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  chip: {
    margin: 10
  }
}))

function TagWithDelete({tag, setTagList}) {
  const classes = useStyles()

  const handleDelete = () => {
    setTagList(prev => prev.filter(item => item.name !== tag.name))
  }

  return (
    <Chip 
      className={classes.chip}
      size="small"
      variant="outlined"
      label={tag.name}
      color="primary"
      key={tag.id}
      onDelete={handleDelete}
    />
  )
}

export default TagWithDelete