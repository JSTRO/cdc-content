import React from 'react'
import UserStore from '../stores/UserStore'
import { observer } from 'mobx-react'
import MyListItem from './MyListItem'

function MyList() {
	return (
		<div>
			{UserStore.loading && 'Loading'}
			{UserStore.list.map(item => (
				<MyListItem item={item} key={item.listID} />
			))}
		</div>
	)
}

export default observer(MyList)