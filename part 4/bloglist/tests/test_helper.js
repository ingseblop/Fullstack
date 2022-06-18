const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Lambda 1',
    author: 'bas',
    url: 'www.yo.com',
    user_Id: '62a99fc8d6ef615e73559e46',
    likes: 4
  },
  {
    title: 'Lambda 2',
    author: 'ian',
    url: 'www.bas.com',
    user_Id: '62a99fc8d6ef615e73559e46',
    likes: 5
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}