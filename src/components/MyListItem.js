import React, { useContext } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Link,
  IconButton,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { ListContext } from '../context/listContext'
import DOMPurify from 'dompurify'
import formatDate from '../utils/formatDate.js'
import myListItemStyles from '../styles/myListItemStyles'
import '../App.css'

function MyListItem({ item }) {
  const classes = myListItemStyles()
  const { deleteListItem } = useContext(ListContext)
  const { name, sourceUrl, owningOrgId, datePublished } = item
  const sanitizedName = { __html: DOMPurify.sanitize(name) }

  return (
    <Card className={classes.card} variant="outlined">
      <div className={classes.details}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={2}>
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

export default MyListItem