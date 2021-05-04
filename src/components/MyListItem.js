import React from 'react'
import UserStore from '../stores/UserStore'
import { observer } from 'mobx-react'
import {
  Avatar,
  Grid,
  Card,
  CardContent,
  Link,
  IconButton,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import DOMPurify from 'dompurify'
import formatDate from '../utils/formatDate.js'
import myListItemStyles from '../styles/myListItemStyles'
import '../App.css'

function MyListItem({ item }) {
  const classes = myListItemStyles()
  const { deleteListItem } = UserStore
  const { name, thumbnailUrl, sourceUrl, owningOrgId, datePublished } = item
  const sanitizedName = { __html: DOMPurify.sanitize(name) }

  return (
    <Card className={classes.card} variant="outlined">
      <div className={classes.details}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Avatar alt={thumbnailUrl} src={thumbnailUrl} variant="square" />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1" gutterBottom>
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
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="delete"
                onClick={() => deleteListItem(item.listID)}
              >
                <DeleteIcon className="delete-icon" />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  )
}

export default observer(MyListItem)