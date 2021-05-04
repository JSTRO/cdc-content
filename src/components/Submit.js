import React from 'react'
import Button from '@material-ui/core/Button'

function Submit({ text, disabled, color, onClick }) {
	return (
		<div>
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