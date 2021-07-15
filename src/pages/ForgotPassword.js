import React, { useContext } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'
import Submit from '../components/Submit'
import ContinueToBrowse from '../components/ContinueToBrowse'
import PasswordSent from './PasswordSent'
import AuthField from '../components/AuthField'
import { AuthContext } from '../context/authContext'
import '../App.css'

function ForgotPassword() {
	
	const {email, resetPassword, errors, buttonDisabled, emailSent} = useContext(AuthContext)

	if (emailSent) {
		return (
			<PasswordSent />
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
								<form>
									<Grid container direction="column" spacing={2}>
										<Grid item>
											<AuthField name="email" value={email} />
										</Grid>
										<Grid item>
											<Submit
												text="Continue"
												color="primary"
												disabled={buttonDisabled}
												onClick={resetPassword}
											/>
										</Grid>
									</Grid>
								</form>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default ForgotPassword