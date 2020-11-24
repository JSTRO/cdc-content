import React from 'react'
import UserStore from '../stores/UserStore'
import { observer } from 'mobx-react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Link from '@material-ui/core/Link'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import '../App.css'

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    margin: 10,
    padding: 0
  },
  cardContent: {
    display: 'flex',
    flex: '1 0 auto',
    maxWidth: 1000,
  },
}))

function MyListItem({item}) {

  const classes = useStyles()
  const { deleteListItem } = UserStore

  return (
    <Card className={classes.card} variant="outlined">
      <div className={classes.details}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={1}>
            <Grid item xs={11}>
              <ListItem>
                <Link
                  color="inherit"
                  href={item ? item.sourceUrl : ""}
                  target="blank"
                  underline="none"
                > 
                  {item.name}
                </Link>
              </ListItem>
            </Grid>
            <Grid item xs={1}>
              <IconButton 
                aria-label="delete" 
                onClick={() => deleteListItem(item.listID)}
              >
                <DeleteIcon className="delete-icon"/>
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  )
}

export default observer(MyListItem)