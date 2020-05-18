const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
}, 30000)


test('Correct number of blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('Unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})


test('A valid blog can be added', async () => {
  const newBlog = {
    title: 'First Post',
    author: "Wafa",
    url: "non-existent3",
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await helper.blogsInDb()

  const contents = allBlogs.map(r => {
    return (
      {
        title: r.title,
        author: r.author,
        url: r.url,
        likes: r.likes
      }
    )
  })
  expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContainEqual(newBlog)
})

test('Likes property defaults to zero', async () => {
  const newBlog = {
    title: 'City Foods',
    author: "Melvin",
    url: "https://melivinsfoods.com/city"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await helper.blogsInDb()
  const newlyAdded = allBlogs.find(r => r.body === newBlog.body && r.author === newBlog.author)
  expect(newlyAdded.likes).toEqual(0)
})

test('Adding invalid blog results in 400 Bad Request', async () => {
  const newBlog = {
    author: "Melvin",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})