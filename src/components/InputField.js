import React from 'react'

function InputField({type, placeholder, value, onChange}) {
	return (
		<div className="input">
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	)
}

export default InputField