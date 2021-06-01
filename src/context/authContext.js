import React, { useState } from 'react'
import axios from 'axios'

const AuthContext = React.createContext({})

function AuthContextProvider(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [resetSuccess, setResetSuccess] = useState(false)

    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [expiration, setExpiration] = useState(0)
    const [list, setList] = useState([])

    const [errors, setErrors] = useState([])
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleInputChange = event => {
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
            } else {
                setLoading(false)
                setIsLoggedIn(false)
            }
        } catch (err) {
            setLoading(false)
            setIsLoggedIn(false)
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
                setErrors(errors => [...errors, result.error])
            }
        } catch (err) {
            resetForm()
        }
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
                setErrors(errors => [...errors, result.error])
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
                setExpiration(result.expiration)
                setEmail(result.email)
                
            } else if (result && result.success === false) {
                resetForm()
                setErrors(errors => [...errors, result.error])
            }
        } catch (err) {
            resetForm()
        }
    }

    const updatePassword = async token => {
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
                    token: token,
                }),
            })

            let result = await res.data

            if (result && result.success) {
                setResetSuccess(true)
            } else {
                resetForm()
                console.log(result.error)
                setErrors(errors => [...errors, result.error])
            }
        } catch (err) {
            console.log(err)
            resetForm()
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
                setList([...result.data])
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
                    return
                } else {
                    setLoading(false)
                    setList([...list, result])
                }
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

    const authContextValue = {
        username,
        password,
        email,
        confirm,
        checkIsLoggedIn,
        isLoggedIn,
        doLogin,
        doRegister,
        resetPassword,
        updatePassword,
        logout,
        loading,
        getListItems,
        list,
        isItemInList,
        addToList,
        deleteListItem,
        errors,
        setErrors,
        buttonDisabled,
        handleInputChange,
        resetForm,
        expiration,
        resetSuccess
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider, AuthContext }