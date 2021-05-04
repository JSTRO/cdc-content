import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import UserStore from '../stores/UserStore'

const useAuth = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')
	const [errors, setErrors] = useState({})
	const [buttonDisabled, setButtonDisabled] = useState(false)

	const history = useHistory()

	const setInputValue = event => {
		event.preventDefault()
		let { name, value } = event.target
		value = value.trim()

		if (name === 'username') {
			setUsername(value)
		} else if (name === 'password') {
			setPassword(value)
		} else if (name === 'confirm') {
			setConfirm(value)
		} else {
			setEmail(value)
		}
	}

	const resetForm = () => {
		setUsername('')
		setEmail('')
		setPassword('')
		setConfirm('')
		setButtonDisabled(false)
	}

	const doRegister = async () => {
		if (!username) return
		if (!email) return
		if (!password) return
		if (!confirm) return
		setButtonDisabled(true)

		try {
			let res = await axios({
				url: '/register',
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				data: JSON.stringify({
					username: username,
					email: email,
					password: password,
					confirm: confirm,
				}),
			})

			let result = await res.data

			if (result && result.success) {
				alert(result.msg)
				doLogin()
			} else if (result && result.success === false) {
				resetForm()
				setErrors({[result.error]: result.msg})
			}
		} catch (err) {
			resetForm()
		}
	}

	const doLogin = async () => {
		if (!username) return
		if (!password) return
		setButtonDisabled(true)

		try {
			let res = await axios({
				url: '/login',
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				data: JSON.stringify({
					username: username,
					password: password,
				}),
			})

			let result = await res.data

			if (result && result.success) {
				UserStore.isLoggedIn = true
				UserStore.username = result.username
			} else if (result && result.success === false) {
				resetForm()
				setErrors({[result.error]: result.msg})
			}
		} catch (err) {
			resetForm()
		}
	}

	const resetPassword = async () => {
		if (!email) return
		setButtonDisabled(true)

		try {
			let res = await axios({
				url: '/resetPassword',
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				data: JSON.stringify({
					email: email,
				}),
			})

			let result = await res.data

			if (result && result.success) {
				UserStore.email = result.email
				UserStore.expiration = result.expiration
				history.replace('sent')
			} else if (result && result.success === false) {
				resetForm()
				setErrors({[result.error]: result.msg}) // SIMPLIFY
			}
		} catch (err) {
			resetForm()
		}
	}

	const updatePassword = async (token) => {
  	if (!password) return
		if (!confirm) return
		
  	try {
			let res = await axios({
				url: '/updatePassword',
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				data: JSON.stringify({
					password: password,
					confirm: confirm,
					token: token
				}),
			})

			let result = await res.data

			if (result && result.success) {
				history.replace('login')
				alert('Password reset successfully.')
			} else {
				//resetForm()
				console.log(result.error)
				setErrors({[result.error]: result.msg})
			}
		} catch (err) {
			resetForm()
		}
  }

	return {
		username,
		password,
		email,
		confirm,
		resetForm,
		errors,
		setErrors,
		setInputValue,
		buttonDisabled,
		doLogin,
		doRegister,
		resetPassword,
		updatePassword
	}
}

export default useAuth