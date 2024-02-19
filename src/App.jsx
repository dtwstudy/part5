import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessageAlert] = useState({ text: '', color: '', status: false })
  const [blogForm, setBlog] = useState({ title: '', author: '', url: '', likes: '' })

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


  const addBlog = (event) => {
    event.preventDefault()
    try {
      const res = blogService.create(blogForm)
      showMessage('You successful added new blog post ', 'successful')

    }
    catch (error) {
      console.log(error)
      showMessage('Error create new blog', 'error')
    }

  }

  const logOut = () => {

    setUser(null)
    if (window.localStorage.getItem("loggedBlogappUser")) window.localStorage.removeItem("loggedBlogappUser")
    window.localStorage.clear()
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogInputForm = () => (

    <form onSubmit={addBlog}>
      <label>title</label> <input value={blogForm.title} id="title" onChange={({ target }) => setBlog({ ...blogForm, title: target.value })} type='text' name='title' />
      <br /><label >author</label><input value={blogForm.author} id="author" onChange={({ target }) => setBlog({ ...blogForm, author: target.value })} type='text' name='author' />
      <br /><label >url</label><input value={blogForm.url} id="url" onChange={({ target }) => setBlog({ ...blogForm, url: target.value })} type='text' name='url' />
      <br /><label >likes</label><input value={blogForm.likes} id="likes" onChange={({ target }) => setBlog({ ...blogForm, likes: target.value })} type='text' name='likes' />
      <button type="submit">save</button>
    </form>
  )

  const blogsView = () => (

    <div>

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  if (user !== null) {
    return (
      <>
        <Notification message={message.text} color={message.color} />
        <p>{user.username}<button onClick={logOut}>logout</button></p>
        {blogInputForm()}
        {blogsView()}
      </>
    )
  }
  else {
    return (
      <>
        <Notification message={message.text} color={message.color} />
        {loginForm()}
        {blogsView()}
      </>
    )
  }
}

export default App