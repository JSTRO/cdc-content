import React from 'react'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Submit from '../components/Submit'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import '../App.css'

function RegisterPage({username, password, confirm, setInputValue, buttonDisabled, doRegister}) {
	return (
		<div className="register">
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
									Sign Up
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
											<TextField
												required
												name='confirm'
												label='confirm'
												autoComplete='confirm'
												variant="outlined"
												value={confirm ? confirm : ''}
												onChange={setInputValue}
											/>
										</Grid>
										<Grid item>
											<Submit 
												text='Register'
												color="primary"
												disabled={buttonDisabled}
												onClick={() => doRegister()}
											/>
										</Grid>
									</Grid>
								</form>
							</Grid>
							<Grid item>
								Already a member? <Link to='/login'>Sign In</Link>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default RegisterPage