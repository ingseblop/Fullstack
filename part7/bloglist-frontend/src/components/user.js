import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

const User = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)
  const ordenado = blogs.map((blog) => (blog.user_Id === user.id ? blog : null))
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ListGroup as="ol">
        {ordenado.map((blog) => (
          <ListGroup.Item as="li" key="blog.id">
            {blog.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
