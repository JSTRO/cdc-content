import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

function ContinueToBrowse() {
	return (
    <Link to="/" className="continue"> Continue to browse </Link>
  )
}

export default observer(ContinueToBrowse)