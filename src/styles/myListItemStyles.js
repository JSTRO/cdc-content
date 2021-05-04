import { makeStyles } from '@material-ui/core/styles'

const myListItemStyles = makeStyles(theme => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    margin: 10,
    padding: 0,
  },
  cardContent: {
    display: 'flex',
    flex: '1 0 auto',
    maxWidth: 1000,
  },
}))

export default myListItemStyles