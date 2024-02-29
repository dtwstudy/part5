import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessageAlert] = useState({ text: '', color: '', status: false })
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showMessage = (text, color) => {
    setMessageAlert({ text: text, color: color, status: true })

    if (message.status) {
      setTimeout(() => {
        setMessageAlert({ text: '', color: '', status: false })
      }, 5000)

    }


  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showMessage('Welcome back', 'successful')
    } catch (exception) {

      console.log(exception)
      showMessage('Error login wrong password', 'error')


    }
  }




  const onSubmit = (blog) => {

    try {
      const res = blogService.create(blog)
      showMessage('You successful added new blog post ', 'successful')
      blogFormRef.current.toggleVisibility()

    }
    catch (error) {
      console.log(error)
      showMessage('Error create new blog', 'error')
    }

  }

  const hadleOnLike = (blog) => {

    try {
      console.log(blog)
      const res = blogService.update(blog.id,blog)
      showMessage('Like added to blog ', 'successful')
      

    }
    catch (error) {
      console.log(error)
      showMessage('Error add like', 'error')
    }

  }


  const logOut = () => {

    setUser(null)
    if (window.localStorage.getItem("loggedBlogappUser")) window.localStorage.removeItem("loggedBlogappUser")
    window.localStorage.clear()
  }

  const LoginIn = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

 const BlogView = () => (

    <div>

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} hadleOnLike={hadleOnLike} />
      )}
    </div>
  )

  if (user !== null) {
    return (
      <>
        <Notification message={message.text} color={message.color} />
        <p>{user.username} logged in<button onClick={logOut}>logout</button></p>
        
        <Togglable buttonLabel="new blog" name="cancel" ref={blogFormRef}>
          <BlogForm onSubmit={onSubmit} />
        </Togglable>
        <BlogView />
      </>
    )
  }
  else {
    return (
      <>
        <Notification message={message.text} color={message.color} />
        <LoginIn />
        <BlogView />
      </>
    )
  }
}

export default App