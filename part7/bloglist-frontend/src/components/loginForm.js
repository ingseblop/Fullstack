import { useDispatch } from 'react'
import { useHistory } from 'react-router-dom'
import { login } from '../reducers/authReducer'
import { initBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(login(username, password))
    dispatch(setNotification(`Welcome ${username}`))
    dispatch(initBlogs())
    history.push('/blogs')
  }
  return (
    <Form onSubmit={handleLogin}>
      <Form.group>
        <Form.Label>User name</Form.Label>
        <Form.Control type="text" name="username" />
      </Form.group>
      <Form.group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" />
      </Form.group>
      <Button id="login-button" type="submit" variant="primary">
        login
      </Button>
    </Form>
  )
}

export default LoginForm
