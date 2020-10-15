import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Tag from './Tag'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles'
import formatDate from '../utils/formatDate.js'
//import addToList from '../auth/addToList'
import axios from 'axios'
import UserStore from '../stores/UserStore'

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

function Article({article, setMyList, setTagList}) {
	const classes = useStyles()
	const {id, name, description, datePublished, tags, owningOrgId, sourceUrl} = article
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)

  const handleList = () => {
    setMyList(prev => prev.includes(name) ? prev : [...prev, name])
  }

  async function addToList() {
    try {
      let res = await axios({
        url: '/list',
        method: 'post',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        },
        data: JSON.stringify({
          username: UserStore.username,
          listID: id
        })
      })
      
      let result = await res.data
      
      if (result && result.success) {
        UserStore.loading = false
        setIsBtnDisabled(true)
        UserStore.list.push(result.listID)
      } else {
        UserStore.loading = false
      }
      
    } catch(err) {
        UserStore.loading = false
    }
  }

  const chips = tags.map(tag => (
    <Tag 
      tag={tag}
      setTagList={setTagList}
    /> 
  ))

	return (
		<Card className={classes.root} variant="outlined">
			<div className={classes.details}>
	    	<CardContent className={classes.content}>	
	    		<Typography variant="h5" component="h2" gutterBottom>
          	<Link href={sourceUrl} target="blank" color="inherit" underline="none">{name}</Link>
        	</Typography>
        	<Typography color="textSecondary" gutterBottom>
          	{owningOrgId} • {formatDate(datePublished)}
        	</Typography>
        	{chips}
        	<Typography>
          	{description}
        	</Typography>
            <IconButton color="primary" aria-label="add to list" onClick={addToList} disabled={isBtnDisabled}>
              <AddCircleIcon />
            </IconButton>  {isBtnDisabled ? "Added to list" : "Add to my list"}
	    	</CardContent>	
    	</div>
    </Card>	
	)
}

export default Article