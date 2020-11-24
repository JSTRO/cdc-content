import React from 'react'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Submit from '../components/Submit'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { observer } from 'mobx-react'
import '../App.css'

function LoginPage({username, password, setInputValue, buttonDisabled, doLogin}) {
	return (
		<>
			<Grid container spacing={0} justify="center" direction="row">
				<Grid item>
					<Grid
						container
						direction="column"
						justify="center"
						spacing={2}
						className="login-form"
					>
						<Paper variant="elevation" elevation={2} className="register-background">
							<Grid item>
								<Typography component="h1" variant="h5">
									Log In
								</Typography>
							</Grid>
							<Grid item>
								<form>
									<Grid container direction="column" spacing={2}>
										<Grid item>
											<TextField
												required
												name='username'
												label='username'
												autoComplete='username'
												variant="outlined"
												value={username ? username : ''}
												onChange={setInputValue}
											/>
										</Grid>
										<Grid item>
											<TextField
												required
												name='password'
												label='password'
												autoComplete='password'
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
								<Link to="/register">
									Sign Up
								</Link>
							</Grid>
							<Grid item>
								Forgot Password?
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default observer(LoginPage)