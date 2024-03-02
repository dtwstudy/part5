import { useState} from 'react'
const LoginForm = ({ handleUsernameChange, handlePasswordChange, handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const LoginIn = (event) => {
    event.preventDefault()
    handleLogin(username,password)
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={LoginIn}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id='username'
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id='password'
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}
export default LoginForm