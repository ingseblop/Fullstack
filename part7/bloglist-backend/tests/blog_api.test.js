const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    
    const promiseBlogs = blogObjects.map(blog => blog.save())
    await Promise.all(promiseBlogs)
  },1000000)

test('blogss are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},100000)

test('correct amount of blog posts', async ()=> {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
},100000)

test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
})

test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToUpdated = blogsAtStart[0]

    const updatedBlog = [{
        title: blogToUpdated.title,
        author: blogToUpdated.author,
        url: blogToUpdated.url,
        likes: 3
    }]

    await api
      .put(`/api/blogs/${blogToUpdated.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const resultBlog = await api
      .get(`/api/blogs/${blogToUpdated.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
    const processedBlogToView = JSON.parse(JSON.stringify(blogToUpdated))

    expect(resultBlog.body).toEqual(processedBlogToView)
})

afterAll(() => {
  mongoose.connection.close()
})