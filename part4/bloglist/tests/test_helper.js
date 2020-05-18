const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'My Daily Menu',
    author: "Wafa",
    url: "non-existent",
    likes: 1
  },
  {
    title: 'Bikes',
    author: "Jay",
    url: "non-existent2",
    likes: 0
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: "fake" })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blogs => blogs.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}