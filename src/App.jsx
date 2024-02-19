import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const handleLogin = async (event) => {
    event.preventDefault()
  
    try {
      const user = await loginService.login({
        username, password,
      })
      // window.localStorage.setItem(
      //   'loggedBlogappUser', JSON.stringify(user)
      // ) 
      blogService.setToken(user)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      console.log(exception)
      setTimeout(() => {
       // setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog  = () => {

  }

  const logOut = () => {
   
    setUser(null)
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
  const blogForm = () => (
    
    <form onSubmit={addBlog}>
      
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

if(user !== null ){ 
      return ( 
        <>
        <p>{user.username}<button onClick={logOut}>logout</button></p>
        {blogForm()}
        {blogsView()}
        </>
      )}
      else{
        return(
          <>
             { loginForm() }
             {blogsView()}
          </>
        )
      }
     

     
}

export default App