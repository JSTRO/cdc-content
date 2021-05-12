import React from 'react'
import ContinueToBrowse from '../components/ContinueToBrowse'
import '../App.css'

function PasswordSent() {

	return (
		<>
			<ContinueToBrowse />
			<p className="password-sent">
				An email has been sent with instructions for resetting your password. Please click the link in the email to proceed.
			</p>
		</>	
	)
}

export default PasswordSent