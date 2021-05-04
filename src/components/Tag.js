import React from 'react'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  chip: {
    margin: 4,
  },
}))

function Tag({ tag, setTagList }) {
  const classes = useStyles()

  const handleTag = () => {
    setTagList(prev =>
      prev.some(prevTag => prevTag.id === tag.id) ? prev : [...prev, tag]
    )
  }

  return (
    <Chip
      className={classes.chip}
      size="small"
      variant="outlined"
      label={tag.name}
      onClick={handleTag}
      color="primary"
      key={tag.id}
    />
  )
}

export default Tag