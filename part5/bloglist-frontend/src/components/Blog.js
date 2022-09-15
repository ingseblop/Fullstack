import { useState } from 'react'

const Blog = ({ blog, likesHandler, removeHandler }) => {
  const [Details,setDetails] = useState(false)
  const showDetails = () => {
    setDetails(!Details)
  }
  const toUpdate={
    title: blog.title,
    author: blog.author,
    url:blog.url,
    likes: blog.likes + 1,
    id: blog.id
  }
  const addLikes = () => {
    likesHandler(toUpdate)
  }
  const showWhenVisible = { display: Details ? '' : 'none' }
  return (
    <div className="blog">
      {blog.title} by {blog.author}
      <button onClick={showDetails} id='view'>view</button><br></br>
      <div style={showWhenVisible} className="showInfo">
        <button onClick={showDetails}>cancel</button><br></br>
        {blog.url}<br></br>
        likes {blog.likes}
        <button onClick={addLikes} data-testid="like" id='like'>Like</button><br></br>
        <button onClick={() => removeHandler(blog.id)} id="remove">Remove blog</button>
      </div>
    </div>
  )
}

export default Blog