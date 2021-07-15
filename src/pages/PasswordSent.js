import React, { useContext } from 'react'
import ContinueToBrowse from '../components/ContinueToBrowse'
import { AuthContext } from '../context/authContext'
import '../App.css'

function PasswordSent() {

	const { expiration } = useContext(AuthContext)

	console.log(expiration, Date.now())

	if (Date.now() < expiration) {
		return (
			<>
				<ContinueToBrowse />
				<p className="password-sent">
					An email has been sent with instructions for resetting your password. Please click the link in the email to proceed.
				</p>
			</>	
		)
	}

	if (Date.now() >= expiration) {
		return (
			<>
				<ContinueToBrowse />
				<p className="password-sent">
					This link to reset your password has expired. Please return to the Reset Password page to proceed.
				</p>
			</>	
		)
	}
}

export default PasswordSent