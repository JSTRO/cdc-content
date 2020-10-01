import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

function Submit({text, disabled, color, onClick}) {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Button
				variant="contained"
				color={color}
				type="submit"
				className="button-block"
				disabled={disabled}
				onClick={() => onClick()}
				>
					{text}
			</Button>
		</div>
	)
}

export default Submit