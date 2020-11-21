import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Tag from './Tag'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import formatDate from '../utils/formatDate.js'
import DOMPurify from 'dompurify'
import UserStore from '../stores/UserStore'
import { observer } from 'mobx-react'
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
    sourceUrl,
    thumbnailUrl,
  } = article
  const sanitizedName = { __html: DOMPurify.sanitize(article.name) }
  const { isLoggedIn, addToList, isItemInList } = UserStore
  const chips = tags.map(tag => (
    <Tag key={tag.id} tag={tag} setTagList={setTagList} />
  ))

  return (
    <Card className={classes.root} variant="outlined">
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Grid container spacing={2}>
            <Grid item med={3}>
              <Avatar
                alt={thumbnailUrl}
                src={thumbnailUrl}
                variant="square"
                className={classes.large}
              />
            </Grid>
            <Grid item med={9}>
              <Typography variant="h6" component="h2" gutterBottom>
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
          <Typography className={classes.description}>{description}</Typography>
          {isLoggedIn && (
            <IconButton
              color="primary"
              aria-label="add to list"
              onClick={() => addToList(id, name, sourceUrl)}
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

export default observer(Article)