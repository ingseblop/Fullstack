import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/blogForm'
import LoginForm from './components/loginForm'
import BlogList from './components/blogList'
import Togglable from './components/toggable'
import Menu from './components/NavBar'
import Notification from './components/Notification'
import { initUser } from './reducers/loginReducer'
import { initBlogs } from './reducers/blogReducer'
import { initAllUsers } from './reducers/userReducer'
import { useRouteMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blog)

  const userMatch = useRouteMatch('/users/:id')
  const foundUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const foundBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  useEffect(() => {
    dispatch(initUser())
    dispatch(initBlogs())
    dispatch(initAllUsers())
  }, [dispatch])

  const blogFormRef = useRef()

  return (
    <div className="container">
      <Menu blog={foundBlog} fuser={foundUser} />
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
