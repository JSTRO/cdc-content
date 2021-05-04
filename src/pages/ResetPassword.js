import React from 'react'
import { observer } from 'mobx-react'
import { Link, useParams } from 'react-router-dom'
import { TextField, Grid, Typography, Paper } from '@material-ui/core'
import Submit from '../components/Submit'
import ContinueToBrowse from '../components/ContinueToBrowse'
import useAuth from '../hooks/useAuth'
import '../App.css'

function ResetPassword() {
	const {
		password,
		confirm,
		errors,
		setInputValue,
		buttonDisabled,
		updatePassword,
	} = useAuth()
	
	const { token } = useParams()

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
							className="login-background"
						>
							<Grid item>
								<ul className="validation-errors">
									{Object.values(errors).map((error, idx) => {
										return <li key={idx}>{error}</li>
									})}
								</ul>
								<Typography variant="h5" gutterBottom>
									Reset Password
								</Typography>
							</Grid>
							<Grid item>
								<form onSubmit={() => updatePassword(token)}>
									<Grid container direction="column" spacing={2}>
										<Grid item>
											<TextField
												required
												name="password"
												type="password"
												label="new password"
												autoComplete="password"
												variant="outlined"
												value={password ? password : ''}
												onChange={setInputValue}
											/>
										</Grid>
										<Grid item>
											<TextField
												required
												name="confirm"
												label="confirm password"
												type="password"
												autoComplete="password"
												variant="outlined"
												value={confirm ? confirm : ''}
												onChange={setInputValue}
											/>
										</Grid>
										<Grid item>
											{/*<Submit
												text="Reset Password"
												color="primary"
												disabled={buttonDisabled}
												onClick={() => updatePassword(token)}
											/>*/}
											<input type="submit" value="Reset Password" />
										</Grid>
									</Grid>
								</form>
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

export default observer(ResetPassword)