import React from 'react'
import Button from '@material-ui/core/Button'

function Submit({text, disabled, onClick}) {

	return (
		<div className="submit">
			<Button
				variant="contained"
				color="primary"
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

// <button
// 				text={text}
// 				disabled={disabled}
// 				onClick={() => onClick()}
// 			>
// 				{text}
// 			</button>