import React from 'react'
import UserStore from '../stores/UserStore'
import useAuth from '../hooks/useAuth'
import { observer } from 'mobx-react'
import MyListItem from './MyListItem'

function MyList() {

	const { loading, list } = useAuth()

	console.log(list)

	return (
		<div>
			{loading && 'Loading'}
			{list.map(item => (
				<MyListItem item={item} key={item.listID} />
			))}
		</div>
	)
}

export default observer(MyList)