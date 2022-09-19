import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'InitBlogs':
      return action.data
    case 'NewBlog':
      return [...state, action.data]
    case 'Like': {
      const id = action.data.id
      const updatedBlog = state.find((blog) => blog.id === id)
      const changedBlog = {
        ...updatedBlog,
        likes: updatedBlog.likes + 1
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    }
    case 'Delete':
      return state.filter((blog) => blog.id !== String(action.data))
    case 'Comment': {
      const id = action.data.id
      const updatedBlog = state.find((blog) => blog.id === id)
      const changedBlog = {
        ...updatedBlog,
        comments: action.data.comments
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    }
    default:
      return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'InitBlogs',
      data: blogs
    })
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'NewBlog',
        data: newBlog
      })
    } catch (exception) {
      dispatch(setNotification(`cannot create blog ${content.title}`))
    }
  }
}

export const likes = (content) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update({
        ...content,
        likes: content.likes + 1
      })
      dispatch({
        type: 'Like',
        data: updatedBlog
      })
    } catch (exception) {
      dispatch(setNotification(`cannot update blog ${content.title}`))
    }
  }
}

export const remove = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'Delete',
        data: id
      })
    } catch (exception) {
      dispatch(setNotification('cannot delete blog'))
    }
  }
}

export const comment = (content, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update({
        ...content,
        comments: comment
      })
      dispatch({
        type: 'Comment',
        data: updatedBlog
      })
    } catch (exception) {
      dispatch(setNotification(`cannot update blog ${content.title}`))
    }
  }
}

export default blogReducer
