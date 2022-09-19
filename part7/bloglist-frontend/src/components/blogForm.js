import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const dispatch = useDispatch()
  const addblog = async (event) => {
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      comments: []
    }
    dispatch(createBlog(newBlog))
    dispatch(setNotification(`${title} added`))
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }
  return (
    <div className="blogForm">
      <h2>Create a new blog</h2>
      <Form onSubmit={addblog}>
        <Form.group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" />
        </Form.group>
        <Form.group>
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" />
        </Form.group>
        <Form.group>
          <Form.Label>url</Form.Label>
          <Form.Control type="text" name="url" />
        </Form.group>
        <Button id="add-button" type="submit" variant="primary">
          add
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
