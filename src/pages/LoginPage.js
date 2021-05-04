import React from 'react'
import { Link } from 'react-router-dom'
import { TextField, Grid, Typography, Paper } from '@material-ui/core'
import Submit from '../components/Submit'
import ContinueToBrowse from '../components/ContinueToBrowse'
import { observer } from 'mobx-react'
import useAuth from '../hooks/useAuth'
import '../App.css'

function LoginPage() {
	const {
		username,
		password,
		errors,
		setInputValue,
		buttonDisabled,
		doLogin,
	} = useAuth()

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
									{Object.values(errors).map((error, idx) => (
										<li key={idx}>{error}</li>
									))}
								</ul>
								<Typography variant="h5" gutterBottom>
									Log In
								</Typography>
							</Grid>
							<Grid item>
								<form>
									<Grid container direction="column" spacing={2}>
										<Grid item>
											<TextField
												required
												name="username"
												label="username"
												autoComplete="username"
												variant="outlined"
												value={username ? username : ''}
												onChange={setInputValue}
											/>
										</Grid>
										<Grid item>
											<TextField
												required
												name="password"
												type="password"
												label="password"
												autoComplete="password"
												variant="outlined"
												value={password ? password : ''}
												onChange={setInputValue}
											/>
										</Grid>
										<Grid item>
											<Submit
												text="Log in"
												color="primary"
												disabled={buttonDisabled}
												onClick={() => doLogin()}
											/>
										</Grid>
									</Grid>
								</form>
							</Grid>
							<Grid item>
								<Typography variant="subtitle1">
									<Link to="/register">Sign Up</Link>
								</Typography>
							</Grid>
								<Typography variant="subtitle1">
									<Link to="/forgot" className="continue">Forgot Password?</Link>
								</Typography>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default observer(LoginPage)