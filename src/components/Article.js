import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import formatDate from '../utils/formatDate.js'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: 10,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    maxWidth: 1000
  },
  chip: {
  	margin: 10
  }
}))

function Article({article}) {
	const classes = useStyles()
	const { name, description, datePublished, tags, owningOrgId, sourceUrl } = article

	return (
		<Card className={classes.root} variant="outlined">
			<div className={classes.details}>
	    	<CardContent className={classes.content}>	
	    		<Typography variant="h5" component="h2" gutterBottom>
          	<Link href={sourceUrl} target="blank" color="inherit" underline="none">{name}</Link>
        	</Typography>
        	<Typography color="textSecondary" gutterBottom>
          	{owningOrgId} • Published: {formatDate(datePublished)}
        	</Typography>
        	{tags.map(tag => (
        		<Chip 
        			className={classes.chip}
        			size="small"
        			label={tag.name} 
        			variant="outlined"
        			clickable
        			color="primary"
        			key={tag.id}
        		/>
        	))}
        	<Typography>
          	{description}
        	</Typography>
	    	</CardContent>	
    	</div>
    </Card>	
	)
}

export default Article