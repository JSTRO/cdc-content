import React, {useContext} from 'react'
import { TextField } from '@material-ui/core'
import { AuthContext } from '../context/authContext'

function AuthField({name, value, type}) {

	const {handleInputChange} = useContext(AuthContext)

	return (
		<TextField
			required
			name={name}
			label={name}
			type={type}
			autoComplete={name}
			variant="outlined"
			value={value}
			onChange={handleInputChange}
		/>
	)
}

export default AuthField