import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	nav: {
		margin: 0
	},
  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    listStyle: 'none',
  },
  li: {
  	margin: 5
  }
}))

function Pagination({articlesPerPage, totalArticles, paginate}) {
	const pageNumbers = []
	const classes = useStyles()

	for (let i=1; i<=Math.ceil(totalArticles / articlesPerPage); i++) {
		pageNumbers.push(i)
	}

	return (

		<nav className={classes.nav}>
			<ul className={classes.ul}>
				{pageNumbers.map(num => (
					<li className={classes.li} key={num}>
						<button onClick={() => paginate(num)}>{num}</button>
					</li>
				))}
			</ul>
		</nav>	
	)
}

export default Pagination