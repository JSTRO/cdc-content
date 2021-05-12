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

	const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  const [expiration, setExpiration] = useState('')
  const [list, setList] = useState([])


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
				setIsLoggedIn(true)
				setUsername(result.username)
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
				setEmail(result.email)
				setExpiration(result.expiration)
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

  const checkIsLoggedIn = async () => {
    try {
      let res = await axios({
        url: '/isLoggedIn',
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      let result = await res.data

      if (result && result.success) {
          setLoading(false)
          setIsLoggedIn(true)
          setUsername(result.username)
          getListItems()
      } else {
          setLoading(false)
          setIsLoggedIn(false)
      }
    } catch (err) {
        setLoading(false)
        setIsLoggedIn(false)
    }
  }

  const logout = async () => {
    try {
      let res = await axios({
        url: '/logout',
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      let result = await res.data

      if (result && result.success) {
        setIsLoggedIn(false)
        setUsername('')
      }
    } catch (err) {
        console.log(err)
    }
  }

  const getListItems = async () => {
    try {
      let res = await axios({
        url: '/list',
        method: 'get',
        params: {
          username: username,
        },
      })

      let result = await res.data

      if (result && result.success) {
          setList(list => [...list, ...result.data])
          setLoading(false)
      } else {
          setLoading(false)
      }
    } catch (err) {
        setLoading(false)
    }
  }

  const isItemInList = id => {
    return list.some(item => item.listID === id)
  }

  const addToList = async listItem => {
    let {
      id,
      name,
      sourceUrl,
      thumbnailUrl,
      datePublished,
      owningOrgId,
    } = listItem

    try {
      let res = await axios({
        url: '/list',
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          username,
          listID: id,
          name,
          sourceUrl,
          thumbnailUrl,
          datePublished,
          owningOrgId,
        }),
      })

      let result = await res.data

      if (result && result.success) {
        if (isItemInList(id)) {
            setLoading(false)
        }
          setLoading(false)
          setList([...list, result])
      } else {
          setLoading(false)
      }
    } catch (err) {
        setLoading(false)
    }
  }

  const deleteListItem = async id => {
    try {
      let res = await axios({
        url: '/list',
        method: 'delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        params: {
          username,
          listID: id,
        },
      })

      let result = await res.data

      if (result && result.success) {
          setLoading(false)
          setList(list => list.filter(item => item.listID !== id))
      } else {
          setLoading(false)
      }
    } catch (err) {
        setLoading(false)
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
		updatePassword,
		deleteListItem,
		isLoggedIn,
		checkIsLoggedIn,
		logout,
		addToList,
		isItemInList,
		loading,
		expiration,
		list
	}
}

export default useAuth