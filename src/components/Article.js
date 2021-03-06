import React, { useContext } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Link,
  IconButton
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Tag from './Tag'
import DOMPurify from 'dompurify'
import { AuthContext } from '../context/authContext'
import { ListContext } from '../context/listContext'
import formatDate from '../utils/formatDate.js'
import articleStyles from '../styles/articleStyles'

function Article({ article, setTagList }) {
  const classes = articleStyles()
  const {
    id,
    name,
    description,
    datePublished,
    tags,
    owningOrgId,
    sourceUrl
  } = article
  const sanitizedName = {__html: DOMPurify.sanitize(name)}
  const {isLoggedIn} = useContext(AuthContext)
  const {addToList, isItemInList} = useContext(ListContext)
  const chips = tags.slice(0, 5).map(tag => (
    <Tag key={tag.id} tag={tag} setTagList={setTagList} />
  ))

  return (
    <Card className={classes.root} variant="outlined">
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Grid container spacing={1}>
            {/*<Grid item sm={3}>
              <Avatar
                alt={thumbnailUrl}
                src={thumbnailUrl}
                variant="square"
                className={classes.large}
              />
            </Grid>*/}
            <Grid item sm={9}>
              <Typography variant="subtitle1" component="h2" gutterBottom>
                <Link
                  href={sourceUrl}
                  target="blank"
                  color="inherit"
                  underline="none"
                  dangerouslySetInnerHTML={sanitizedName}
                />
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {owningOrgId
                  ? `${owningOrgId} • ${formatDate(datePublished)}`
                  : formatDate(datePublished)}
              </Typography>
              {chips}
            </Grid>
          </Grid>
          <Typography className={classes.description} variant="subtitle2">{description}</Typography>
          {isLoggedIn && (
            <IconButton
              color="primary"
              aria-label="add to list"
              onClick={() => addToList(article)}
              disabled={isItemInList(id)}
            >
              <Grid container spacing={1}>
                <Grid item sm={2}>
                  <AddCircleIcon />
                </Grid>
                <Grid item sm={10}>
                  <Typography variant="subtitle1">
                    {isItemInList(id) ? 'Added to list' : 'Add to my list'}
                  </Typography>
                </Grid>
              </Grid>
            </IconButton>
          )}
        </CardContent>
      </div>
    </Card>
  )
}

export default Article