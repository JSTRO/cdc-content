import React, { useContext } from 'react'
import MyListItem from './MyListItem'
import { AuthContext } from '../context/authContext'

function MyList() {

	const { loading, list } = useContext(AuthContext)

	return (
		<div>
			{loading && 'Loading'}
			{list && list.map((item, idx) => (
				<MyListItem item={item} key={idx} />
			))}
		</div>
	)
}

export default MyList