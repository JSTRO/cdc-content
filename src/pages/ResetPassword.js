import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Grid, Typography, Paper } from '@material-ui/core'
import Submit from '../components/Submit'
import ContinueToBrowse from '../components/ContinueToBrowse'
import AuthField from '../components/AuthField'
import { AuthContext } from '../context/authContext'
import '../App.css'

function ResetPassword() {
	const { token } = useParams()

	const {password, confirm, updatePassword, resetSuccess, errors, buttonDisabled } = useContext(AuthContext)

	if (resetSuccess) {
		return (
			<>
				<ContinueToBrowse />
				<p className="password-sent">
					Your password has been successfully reset. Please navigate to the <Link to="/login"> Log In</Link> page to proceed.
				</p>
			</>	
		)
	}

	return (
		<>
			<ContinueToBrowse />
			<Grid container spacing={0} justify="center" direction="row">
				<Grid item>
					<Grid
						container
						direction="column"
						justify="center"
						spacing={2}
						className="login-form"
					>
						<Paper
							variant="elevation"
							elevation={2}
							className="auth-background"
						>
							<Grid item>
								{errors &&
									<ul className="validation-errors">
										{errors.map((error, idx) => (
											<li key={idx}>{error}</li>
										))}
									</ul>
								}
								<Typography variant="h5" gutterBottom>
									Reset Password
								</Typography>
							</Grid>
							<Grid item>
								<Grid container direction="column" spacing={2}>
									<Grid item>
										<AuthField name="password" value={password} type="password" />
									</Grid>
									<Grid item>
										<AuthField name="confirm" value={confirm} type="password" />
									</Grid>
									<Grid item>
										<Submit
											text="Reset Password"
											color="primary"
											disabled={buttonDisabled}
											onClick={() => updatePassword(token)}
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item>
								<Typography variant="subtitle1">
									Know your password? <Link to="/login">Log In</Link>
								</Typography>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</>
		// HANDLE ERRORS
	)
}

export default ResetPassword