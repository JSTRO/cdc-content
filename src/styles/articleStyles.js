import { makeStyles } from '@material-ui/core/styles'

const articleStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    margin: 10,
    fontFamily: 'Tahoma'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
  },
  description: {
    marginTop: 10,
  },
  content: {
    flex: '1 0 auto',
    maxWidth: 1000,
  },
  chip: {
    margin: 10,
    marginLeft: 0,
  },
  large: {
    margin: 5,
    width: '70%',
    height: '70%',
    justify: 'center',
    alignItems: 'center',
  },
}))

export default articleStyles