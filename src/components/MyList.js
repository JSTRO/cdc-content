import React, { useContext, useEffect} from 'react'
import MyListItem from './MyListItem'
import { AuthContext } from '../context/authContext'
import { ListContext } from '../context/listContext'

function MyList() {

	const { listLoading, list, getListItems } = useContext(ListContext)
	const { username } = useContext(AuthContext)

	useEffect(() => {
    getListItems()
  }, [username])

	return (
		<div>
			{listLoading && 'Loading'}
			{list && list.map((item, idx) => (
				<MyListItem item={item} key={idx} />
			))}
		</div>
	)
}

export default MyList