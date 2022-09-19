import { useDispatch } from 'react-redux'
import { likes, remove, comment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const addLikes = () => {
    dispatch(likes(blog))
    dispatch(setNotification(`${blog.title} updated`))
  }
  const removeHandler = () => {
    dispatch(remove(blog.id))
    dispatch(setNotification(`${blog.title} removed`))
  }
  const commentHandler = async (event) => {
    const newComment = event.target.title.value
    event.target.title.value = ''
    dispatch(comment(blog, newComment))
    dispatch(setNotification('Comment added'))
  }
  return (
    <div className="container">
      {blog.title} by {blog.author}
      <br />
      {blog.url}
      <br />
      likes {blog.likes}
      <Button onClick={addLikes} variant="secondary" id="like">
        Like
      </Button>
      <br />
      <Button onClick={removeHandler} variant="danger" id="remove">
        Remove blog
      </Button>
      <h3>comments</h3>
      <ListGroup as="ol">
        {blog.comments.map((comment) =>
          comment ? null : (
            <ListGroup.Item as="li" variant="info">
              {' '}
              {comment}{' '}
            </ListGroup.Item>
          )
        )}
      </ListGroup>
      <div>
        <input name={'comment'} />
        <Button onClick={commentHandler} variant="secondary" id="comment">
          Comment
        </Button>
      </div>
    </div>
  )
}

export default Blog
