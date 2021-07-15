import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Paper } from '@material-ui/core'
import Submit from '../components/Submit'
import ContinueToBrowse from '../components/ContinueToBrowse'
import AuthField from '../components/AuthField'
import { AuthContext } from '../context/authContext'
import '../App.css'

function RegisterPage() {
	const {username, password, email, confirm, doRegister, errors, buttonDisabled, resetForm } = useContext(AuthContext)

	useEffect(() => {
		resetForm()
	}, [])

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
									Sign Up
								</Typography>
							</Grid>
							<Grid item>
								<form>
									<Grid container direction="column" spacing={2}>
										<Grid item>
											<AuthField name="username" value={username} />
										</Grid>
										<Grid item>
											<AuthField name="email" value={email} />
										</Grid>
										<Grid item>
											<AuthField name="password" value={password} type="password" />
										</Grid>
										<Grid item>
											<AuthField name="confirm" value={confirm} type="password" />
										</Grid>
										<Grid item>
											<Submit
												text="Register"
												color="primary"
												disabled={buttonDisabled}
												onClick={() => doRegister()}
											/>
										</Grid>
									</Grid>
								</form>
							</Grid>
							<Grid item>
								<Typography variant="subtitle1">
									Already a member? <Link to="/login">Log In</Link>
								</Typography>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default RegisterPage