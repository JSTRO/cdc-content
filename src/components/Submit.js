import React from 'react'

function Submit({text, disabled, onClick}) {

	return (
		<div className="submit">
			<button
				text={text}
				disabled={disabled}
				onClick={() => onClick()}
			>
				{text}
			</button>
		</div>
	)
}

export default Submit