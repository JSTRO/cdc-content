import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TextField, Grid, Typography, Paper } from '@material-ui/core'
import Submit from '../components/Submit'
import ContinueToBrowse from '../components/ContinueToBrowse'
import { AuthContext } from '../context/authContext'
import { FormContext } from '../context/formContext'
import '../App.css'

function LoginPage(props) {

	const {username, password, doLogin} = useContext(AuthContext)
	const {errors, buttonDisabled, handleInputChange, resetForm} = useContext(FormContext)

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
												value={username}
												onChange={handleInputChange}
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
												value={password}
												onChange={handleInputChange}
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

export default LoginPage