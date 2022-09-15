import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
  const [title, settitle] = useState('')
  const [author, setauthor] = useState('')
  const [url, seturl] = useState('')

  const addblog= async() => {
    const newBlog = ({
      title : title,
      author : author,
      url : url,
      likes: 0
    })
    props.create(newBlog)
    settitle('')
    setauthor('')
    seturl('')
  }
  return (
    <div className="blogForm">
      <h2>Create a new blog</h2>

      <form onSubmit={addblog}>
        <div>
              Title
          <input
            id="title"
            type="string"
            value={title}
            name="Title"
            onChange={({ target }) => settitle(target.value)}
          />
        </div>
        <div>
              Author
          <input
            id="author"
            type="string"
            value={author}
            name="Author"
            onChange={({ target }) => setauthor(target.value)}
          />
        </div>
        <div>
              Url
          <input
            id="url"
            type="string"
            value={url}
            name="Url"
            onChange={({ target }) => seturl(target.value)}
          />
        </div>
        <button id="add-button" type="submit">add</button>
      </form>
    </div>
  )}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default BlogForm