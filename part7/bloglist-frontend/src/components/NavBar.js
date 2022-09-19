import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link, useHistory } from 'react-router-dom'
import Blog from './Blog'
import LoginForm from './loginForm'
import UserList from './userList'
import { logout } from '../reducers/loginReducer'
import { Button, Navbar, Nav } from 'react-bootstrap'

const Menu = ({ blog, fuser }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user)

  const padding = {
    paddingRight: 5
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout)
    history.push('/')
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                Blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                Users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user ? (
                <em style={padding}>{user.name} logged in</em>
              ) : (
                <Link style={padding} to="/login">
                  login
                </Link>
              )}
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user ? (
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  type="submit"
                ></Button>
              ) : null}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User user={fuser} />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default Menu
