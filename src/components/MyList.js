import React, { useEffect } from 'react'
import UserStore from '../stores/UserStore'
import { observer } from 'mobx-react'
import MyListItem from './MyListItem'
import useAPI from '../hooks/useAPI'

function MyList() {
	const { loading } = useAPI()

	if (loading) {
		return <p>Loading...</p>
	}
	
	return (
		<div>
			{UserStore.list.map(item => <MyListItem item={item}/>)}	
		</div>
	)
}

export default observer(MyList)