import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import formatDate from '../utils/formatDate.js'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    margin: '10px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
  	width: '50%',
  	height: 'auto'
  },
}))

function Article({article}) {
	const classes = useStyles()
	const { root, details, content } = classes
	const { name, description, datePublished, tags, owningOrgId, sourceUrl } = article

	return (
		<Card className={root} variant="outlined">
			<div className={details}>
	    	<CardContent className={content}>	
	    		<Typography variant="h5" component="h2">
          	{name}
        	</Typography>
        	<Typography color="textSecondary">
          	{owningOrgId} • Published: {formatDate(datePublished)}
        	</Typography>
        	<Typography>
          	{description}
        	</Typography>
	    	</CardContent>	
    	</div>
    </Card>	
	)
}

export default Article