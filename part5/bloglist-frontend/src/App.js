import { useState, useEffect , useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogForm'
import Togglable from './components/toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      blogService.getAll()
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )}
    )}, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sort = blogs.sort((item1,item2) => item2.likes-item1.likes)
  const blogFormRef = useRef()

  const addblog= (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(newBlog)
      .then(result => {
        setErrorMessage(`${result[result.lenght-1].title} added by ${user.name}`)
        setBlogs(result)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)})

  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id= "username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id = "password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const showMessage =() => (
    <div>
      <p>{errorMessage}</p>
      <hr size="8px" color="red"/>
    </div>
  )

  const logOut =() => {
    window.localStorage.clear()
    setUser(null)
  }

  const likesHandler = (blogtoUpdate) => {
    blogService.update(blogtoUpdate).then(() => {
      setErrorMessage('Updated')
      blogService.getAll().then(blogs => {
        setBlogs( blogs )})
    })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const ereaseHandler = id => {
    let name = blogs.find(blog => blog.id === id)
    const message= `Delete ${name.name}?`
    if(window.confirm(message)){
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(n => n.id !== id))
          window.alert('Deleted')
        })
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage !== null ?
        showMessage():
        null
      }
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={logOut}>Log out </button>
          <Togglable buttonLabel= "new blog" ref={blogFormRef}>
            <BlogForm
              create={addblog}
            />
          </Togglable>
          {
            sort.map(blog =>
              <Blog key={blog.id} blog={blog} likesHandler={likesHandler} removeHandler={ereaseHandler}/>
            )}
        </div>
      }

    </div>
  )
}

export default App
