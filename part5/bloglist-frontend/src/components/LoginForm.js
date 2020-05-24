import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = (event) => {
    event.preventDefault()
    props.handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      {props.children}
      <form onSubmit={submitLogin}>
        <div>
          username:
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          password:
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm