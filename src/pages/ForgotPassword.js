import React from 'react'
import { TextField, Grid, Typography, Paper } from '@material-ui/core'
import Submit from '../components/Submit'
import ContinueToBrowse from '../components/ContinueToBrowse'
import { observer } from 'mobx-react'
import useAuth from '../hooks/useAuth'
import '../App.css'

function ForgotPassword() {
	const { email, errors, setInputValue, buttonDisabled, resetPassword } = useAuth()

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
							className="forgot-background"
						>
							<Grid item>
								<ul className="validation-errors">
									{Object.values(errors).map((error, idx) => (
										<li key={idx}>{error}</li>
									))}
								</ul>
								<Typography variant="h5" gutterBottom>
									Reset Password
								</Typography>
							</Grid>
							<Grid item>
								<form>
									<Grid container direction="column" spacing={2}>
										<Grid item>
											<TextField
												required
												name="email"
												label="email"
												autoComplete="email"
												variant="outlined"
												value={email ? email : ''}
												onChange={setInputValue}
											/>
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

export default observer(ForgotPassword)