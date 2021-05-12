import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TextField, Grid, Typography, Paper } from '@material-ui/core'
import Submit from '../components/Submit'
import ContinueToBrowse from '../components/ContinueToBrowse'
import { AuthContext } from '../context/authContext'
import { FormContext } from '../context/formContext'
import '../App.css'

function ResetPassword() {
	const { token } = useParams()

	const {password, confirm, updatePassword} = useContext(AuthContext)
	const {errors, buttonDisabled, handleInputChange} = useContext(FormContext)

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
												onChange={handleInputChange}
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
												onChange={handleInputChange}
											/>
										</Grid>
										<Grid item>
											<Submit
												text="Reset Password"
												color="primary"
												disabled={buttonDisabled}
												onClick={() => updatePassword(token)}
											/>
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

export default ResetPassword