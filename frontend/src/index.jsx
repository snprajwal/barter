import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function Email(props) {
	const [value, setValue] = useState('')
	const handleChange = (e) => {
		setValue(e.target.value)
		const regex = /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/
		if (regex.test(value)) {
			props.validity(true)
		} else {
			props.validity(false)
		}
	}
	return (
		<label>
			Email:
			<input type="text" value={value} onChange={handleChange} />
		</label>
	)
}

function Password(props) {
	const [value, setValue] = useState('')
	const handleChange = (e) => {
		setValue(e.target.value)
		const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
		if (regex.test(value)) {
			props.validity(true)
		} else {
			props.validity(false)
		}
	}
	return (
		<label>
			Password:
			<input type="password" value={value} onChange={handleChange} />
		</label>
	)
}

function Form() {
	const [isEmailValid, setIsEmailValid] = useState(false)
	const [isPasswordValid, setIsPasswordValid] = useState(false)
	const handleEmailValidity = (validity) => {
		setIsEmailValid(validity)
	}
	const handlePasswordValidity = (validity) => {
		setIsPasswordValid(validity)
	}
	const handleSubmit = (e) => {
		alert('Form submitted')
		e.preventDefault()
	}
	return (
		<form onSubmit={handleSubmit}>
			<Email isValid={isEmailValid} validity={handleEmailValidity} /><br />
			<Password isValid={isPasswordValid} validity={handlePasswordValidity} /><br />
			<button type="submit" disabled={!(isEmailValid && isPasswordValid)}>Submit</button>
		</form>
	)
}

ReactDOM.render(<Form />, document.getElementById('root'))
