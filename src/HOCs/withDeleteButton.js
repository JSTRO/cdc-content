import React from 'react'

export function withDeleteButton(WrappedComponent) {
	
	const handleDelete = event => {
		console.log("deleted")
	}

	return function(props) {
		return (
			<WrappedComponent onDelete={handleDelete} {...props}/>
		)
	}
}


